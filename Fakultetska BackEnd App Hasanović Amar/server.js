const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const url = require('url');
const Predmet = require('./predmet.js');
const baza = require(__dirname+'/baza.js');
app.use(express.static(path.join(__dirname+'/public/html')));
app.use(express.static(path.join(__dirname+'/public/css')));
app.use(express.static(path.join(__dirname+'/public/js')));
app.use(express.static(path.join(__dirname+'/csv')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/student", async (req, res) => {
  try {
    const body = req.body;
    if (!body.index || !body.ime || !body.prezime) {
      res.status(500).json({ status: "Neispravni parametri za studenta!" });
      return;
    }
    let studentExists = false;
    let students = await db.student.findAll();
    students = students.map((student) => student.dataValues);
    students.forEach((student) => {
      if (student.index === body.index) {
        studentExists = true;
      }
    });
    if (studentExists) {
      res.status(400).json({ status: `Student sa indexom ${body.index} vec postoji!` });
    } else {
      await db.student.create({
        ime: body.ime,
        prezime: body.prezime,
        index: body.index,
      });
      res.status(200).json({ status: "Kreiran student!" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.post("/predmet", async (req, res) => {
  try {
    const body = req.body;
    if (!body.naziv || !body.kod) {
      res.status(500).json({ status: "Neispravni parametri za predmet!" });
      return;
    }
    const predmet = new Predmet();
    if (!predmet.provjeriKodPredmeta(body.kod)) {
      res.status(500).json({ status: "Kod predmeta nije ispravan!" });
      return;
    }
    let subjectExists = false;
    let subjects = await db.predmet.findAll();
    subjects = subjects.map((subject) => subject.dataValues);
    subjects.forEach((subject) => {
      if (subject.index === body.kod) {
        subjectExists = true;
      }
    });
    if (subjectExists) {
      res.status(404).json({ status: `Predmet sa kodom ${body.kod} vec postoji!` });
    } else {
      await db.predmet.create({
        naziv: body.naziv,
        kod: body.kod,
      });
      res.status(200).json({ status: "Kreiran predmet!" });
    }
  } catch (error) {
    console.log(error.message);
  }
});


app.post("/prisustvo", async (req, res) => {
  try {
    const body = req.body;
    if (!body.tipCasa || !body.redniBrojCasa || !body.sedmica || !body.kodPredmeta || !body.indexStudenta || !body.statusPrisustva) {
      res.status(500).json({ status: "Neispravni parametri za prisustvo!" });
      return;
    }
    let status = "";
    if (!["prisutan", "odsutan", "nijeUneseno"].includes(body.statusPrisustva))
      status = "Status prisustva nije ispravan!";

    let predmet = await db.predmet.findOne({
      where: {
        kod: body.kodPredmeta,
      },
    });
    if (!predmet) status = "Kod predmeta ne postoji!";

    let student = await db.student.findOne({
      where: {
        index: body.indexStudenta,
      },
    });
    if (!student) status = "Index studenta ne postoji!";

    if (status) {
      res.status(500).json({ status });
      return;
    } else {
      let updated = false;
      let classSubject = await db.cas.findOne({
        where: {
          PredmetId: predmet.dataValues.id,
        },
      });
      let attendance = await db.prisustvo.findOne({
        where: {
          StudentId: student.dataValues.id,
          CaId: classSubject.dataValues.id,
        },
      });
      if (attendance && classSubject) {
        updated = true;
      }

      if (updated) {
        await db.prisustvo.update(
          {
            status: body.status,
          },
          {
            where: {
              StudentId: student.dataValues.id,
              CaId: classSubject.dataValues.id,
            },
          }
        );
        res.status(200).json({ status: "Azurirano prisustvo!" });
      } else {
        await db.cas.create({
          redniBroj: body.redniBrojCasa,
          tip: body.tipCasa,
          sedmica: body.sedmica,
          PredmetId: predmet.dataValues.id,
        });
        await db.prisustvo.create({
          StudentId: student.dataValues.id,
          CaId: classSubject.dataValues.id,
          status: body.statusPrisustva,
        });
        res.status(200).json({ status: "Kreirano prisustvo!" });
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get("/prisustvo", async (req, res) => {
  try {
    const kodPredmeta = req.query.kodPredmeta;
    const indexStudenta = req.query.indexStudenta;
    const sedmica = req.query.sedmica;
    if (!kodPredmeta || !indexStudenta || !sedmica) {
      res.status(500).json({ status: "Neispravni parametri za prisustvo!" });
      return;
    }
    let predmet = await db.predmet.findOne({
      where: {
        kod: kodPredmeta,
      },
    });
    if (!predmet) {
      res.status(404).json({ status: "Prisustvo ne postoji1!" });
      return;
    }

    let student = await db.student.findOne({
      where: {
        index: indexStudenta,
      },
    });
    if (!student) {
      res.status(404).json({ status: "Prisustvo ne postoji2!" });
      return;
    }

    let classSubject = await db.cas.findOne({
      where: {
        PredmetId: predmet.dataValues.id,
      },
    });
    if (!classSubject) {
      res.status(404).json({ status: "Prisustvo ne postoji3!" });
      return;
    }

    let attendances = await db.prisustvo.findAll({
      where: {
        StudentId: student.dataValues.id,
        CaId: classSubject.dataValues.id,
      },
    });
    if (!attendances) {
      res.status(404).json({ status: "Prisustvo ne postoji4!" });
      return;
    } else {
      const result = {
        prisustvoZaSedmicu: parseInt(sedmica),
        prisutan: 0,
        odsutan: 0,
        nijeUneseno: 0,
      };
      attendances.forEach((attendance) => {
        result[attendance.dataValues.status]++;
      });
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;

app.listen(3000, () => {
    console.log("Radi Server");
});