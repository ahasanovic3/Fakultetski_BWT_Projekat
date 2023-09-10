const Sequelize = require("sequelize");
const sequelize = new Sequelize("spirala4", "emir", "12022000", {
   host: "localhost",
   dialect: "mysql",
   logging:false
});

const baza={};

baza.Sequelize = Sequelize;  
baza.sequelize = sequelize;

baza.predmet=require('./models/predmet.js')(sequelize);
baza.student=require('./models/student.js')(sequelize);
baza.prisustvo=require('./models/prisustvo.js')(sequelize);
baza.cas=require('./models/cas.js')(sequelize);
baza.student_predmet=require('./models/student_predmet.js')(sequelize);

baza.predmet.hasMany(baza.student_predmet, {as: "studenti"});
baza.predmet.hasMany(baza.cas, {as: "casovi"});
baza.student.hasMany(baza.student_predmet, {as: "predmeti"});
baza.student.hasMany(baza.prisustvo, {as: "prisustva"});
baza.cas.hasMany(baza.prisustvo, {as: "prisustva"});

const kreiranjeTabela = () => {
    setTimeout(() => {
        baza.predmet.sync({force:true})
    },100);

    setTimeout(() => {
        baza.student.sync({force:true})
    },200);
    
    
    setTimeout(() => {
        baza.cas.sync({force:true})
    },300);  

    setTimeout(() => {
         baza.student_predmet.sync({force:true})
    },400);  

    setTimeout(() => {
        baza.prisustvo.sync({force:true})
   },500);  
   
}

 const punjenjeTabela = async () => {

    await baza.predmet.create({
        naziv: "sadsad",
        kod: "RI-BoE-1-1"
    });

    await baza.student.create({
        ime: "Neko",
        prezime: "Nekic",
        index: 11111
    });

    await baza.cas.create({
        tip: "Vjezbe",
        redniBroj: 1,
        sedmica: 2
    });

    await baza.student_predmet.create({
        StudentId: 1,
        PredmetId: 1
    });

    await baza.prisustvo.create({
        status: "odsutan",
        StudentId: 1,
        CaId: 1
    });
}

kreiranjeTabela();

setTimeout(punjenjeTabela,1000);

module.exports = baza;
