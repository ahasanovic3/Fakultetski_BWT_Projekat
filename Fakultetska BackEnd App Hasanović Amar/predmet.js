class Predmet{
    constructor(){
        this.kodPredmeta = "";
    }
    provjeriKodPredmeta(kod){
        
        const kodovi = kod.split("-");
        
        if(kodovi[0]!== "RI" && kodovi[0]!== "AE" && kodovi[0]!== "EE" && kodovi[0]!== "TK"){
            return false;
        }
        if(kodovi[1]!=="BoE" && kodovi[1]!=="MoE" && kodovi[1]!=="RS"){
            return false;
        }
        if(kodovi[1]==="BoE"){
            if(kodovi[2]!=='1' && kodovi[2]!=='2' && kodovi[2]!=='3')
                return false;
        }
        if(kodovi[1]==="MoE" || kodovi[1]==="RS"){
            if(kodovi[2]!=='1' && kodovi[2]!=='2')
                return false;
        }
        if(kodovi[3]!=='1' && kodovi[3]!=='2'){
            return false;
        }
        this.kodPredmeta = kod;
        return true;
    }
}