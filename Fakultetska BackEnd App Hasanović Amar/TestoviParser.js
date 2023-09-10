class TestoviParser {
  dajTacnost(jsonString) {
    let jsonObject = JSON.parse(jsonString);
    let procenatTacnosti =
      (jsonObject.stats.passes / jsonObject.stats.tests) * 100;
    if (procenatTacnosti != parseInt(procenatTacnosti)) {
      procenatTacnosti = Math.round(procenatTacnosti * 10) / 10;
    }
    let rezultat = {};
    rezultat.tacnost = procenatTacnosti + "%";
    rezultat.greske = [];
    if (jsonObject.failures.length) {
      for (let i = 0; i < jsonObject.failures.length; i++) {
        rezultat.greske.push(jsonObject.failures[i].fullTitle);
      }
    }
    return JSON.stringify(rezultat);
  }

  porediRezultate(rezultat1, rezultat2) {
    var rezJson1 = JSON.parse(rezultat1);
    var rezJson2 = JSON.parse(rezultat2);

    var tests1 = this.#kopirajNaziveTestova(rezJson1.tests);
    var tests2 = this.#kopirajNaziveTestova(rezJson2.tests);

    if (this.#uporediNizove(tests1, tests2)) {
      let tacnostObejct1 = JSON.parse(this.dajTacnost(rezultat1));
      let tacnostObejct2 = JSON.parse(this.dajTacnost(rezultat2));
      return JSON.stringify({
        pomjena: tacnostObejct2.tacnost,
        greske: tacnostObejct1.greske,
      });
    } else {
      let failures1 = this.#kopirajNaziveTestova(rezJson1.failures);
      let failures2 = this.#kopirajNaziveTestova(rezJson2.failures);

      let razlikaPrviDrugi = this.#testoviKojiPadajuUPrvomANemaIhUDrugom(
        failures1,
        failures2
      );
      let razlikaDrugiPrvi = this.#testoviKojiPadajuUPrvomANemaIhUDrugom(
        failures2,
        failures1
      );

      let brojnik = razlikaPrviDrugi.length + rezJson2.failures.length;
      let nazivnik = razlikaPrviDrugi.length + rezJson2.tests.length;

      let procenatRazlike = (brojnik / nazivnik) * 100;

      if (procenatRazlike != parseInt(procenatRazlike)) {
        procenatRazlike = Math.round(procenatRazlike * 10) / 10;
      }

      let rezultat = {};
      rezultat.promjena = procenatRazlike + "%";
      rezultat.greske = [...razlikaPrviDrugi].concat(razlikaDrugiPrvi);

      return JSON.stringify(rezultat);
    }
  }

  #kopirajNaziveTestova(niz) {
    var nazivi = [];
    for (let i = 0; i < niz.length; i++) {
      nazivi.push(niz[i].title);
    }
    return nazivi;
  }

  #uporediNizove(niz1, niz2) {
    return (
      niz1.length === niz2.length && niz1.every((x, index) => x === niz2[index])
    );
  }

  #testoviKojiPadajuUPrvomANemaIhUDrugom(niz1, niz2) {
    return niz1.filter((x) => niz2.indexOf(x) === -1);
  }
}

module.exports = TestoviParser;
