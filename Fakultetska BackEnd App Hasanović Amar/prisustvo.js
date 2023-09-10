class Prisustvo{
    static trenutnaSedmica = 1;
    constructor(){
        this.prisustvo = 0;
        this.finalnoStanje = false;
    }
    
    izracunajPrisustvo(sedmica, listaPrisustva){
        
        if(typeof sedmica !== "number" || !(sedmica>=1 && sedmica<=15)  ){
            return {greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!"};
        }

        if(sedmica>this.trenutnaSedmica){
            return {greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!"};
        }
       
        for(let i=0; i<listaPrisustva.length; i++){
            if(!(listaPrisustva[i].hasOwnProperty('prSedmica') && listaPrisustva[i].hasOwnProperty('prisutan') && listaPrisustva[i].hasOwnProperty('odsutan') && listaPrisustva[i].hasOwnProperty('nijeUneseno'))){
                return {greska: "Parametar listaPrisustva nema ispravne properties!"};
            }
        }
        
        let greska_sedmica = null;
        let propertiji = [];
        
        for(let i=0; i<listaPrisustva.length; i++){
            let greske = [];
            
            if(listaPrisustva[i].prSedmica<1 || listaPrisustva[i].prSedmica>15){
                greske.push("prSedmica");
            }
            
            if(listaPrisustva[i].prisutan<0 || listaPrisustva[i].prisutan>8){
                greske.push("prisutan");
            }
            
            if(listaPrisustva[i].odsutan<0 || listaPrisustva[i].odsutan>8){
                greske.push("odsutan");
            }
            
            if(listaPrisustva[i].nijeUneseno<0 || listaPrisustva[i].nijeUneseno>8){
                greske.push("nijeUneseno");
            }

            if(listaPrisustva[i].prisutan+listaPrisustva[i].odsutan+listaPrisustva[i].nijeUneseno>8){
                return {greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!"};
            }

            if(greske.length != 0){
                if(!greska_sedmica){
                    greska_sedmica = listaPrisustva[i].prSedmica;
                    propertiji = greske;
                }
                else{
                    if(greska_sedmica===listaPrisustva[i].prSedmica){
                        greska_sedmica = listaPrisustva[i].prSedmica;
                        propertiji = greske;
                    }
                }
            }
        };
        
        if(propertiji.length!==[]){
            return {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + greska_sedmica + " za properties ["+propertiji+"]!"};
        }

        let ukupno_prisutan = 0, ukupno_odsutan = 0;
        
        let objekatJedinstvenih = {};
        
        for(let i=0; i<listaPrisustva.length; i++){
            objekatJedinstvenih.listaPrisustva[i].prSedmica = {prisutan: listaPrisustva[i].prisutan, odsutan: listaPrisustva[i].odsutan, nijeUneseno: listaPrisustva[i].nijeUneseno};
        }

        let provjeraUnesenosti = true;
        for (var key in objekatJedinstvenih) {
            if (objekatJedinstvenih.hasOwnProperty(key)) {
                ukupno_prisutan += value.prisutan;
                ukupno_odsutan += value.odsutan;
                if(value.NijeUneseno !==0 ){
                    provjeraUnesenosti = false;
                }
            }
        }
        let rezultat = ukupno_prisutan/(ukupno_prisutan+ukupno_odsutan);
        this.prisustvo = rezultat;

        if(provjeraUnesenosti){
            this.finalnoStanje = true;
        }

        rezultat = objekatJedinstvenih[sedmica];
        if(rezultat){
            return {prisustvoZaSedmicu: sedmica, prisutan: rezultat.prisutan, odsutan: rezultat.odsutan, nijeUneseno: rezultat.nijeUneseno};
        }
        return {prisustvoZaSedmicu: sedmica, prisutan: -1, odsutan: -1, nijeUneseno: -1};
    };
}