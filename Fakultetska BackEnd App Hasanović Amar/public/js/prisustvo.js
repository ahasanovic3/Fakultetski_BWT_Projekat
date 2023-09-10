function potvrdi(){
    var kodPredmeta = document.getElementById("kodPredmeta");
    var indexStudenta = document.getElementById("indexStudenta");
    var sedmica = document.getElementById("sedmica");
    AjaxPozivi.dajPrisustvo(kodPredmeta.value,indexStudenta.value,sedmica.value,function(error,data){
        if(document.getElementById("omotac").lastChild)
            document.getElementById("omotac").removeChild(document.getElementById("omotac").lastChild)
        if(error!=null){
            document.getElementById("omotac").appendChild(document.createTextNode(data));
            document.getElementById("omotac").setAttribute("style","color: red; font-size: 15px; font-weight: bold; margin: 0 30%; padding-top: 15px");
        }
        else{
            //document.getElementById("prostor_za_poruku").appendChild(document.createTextNode(data));
            document.getElementById("omotac").setAttribute("style","color: black; font-size: 15px; font-weight: bold; margin: 0 30%");
            let nazivi = ["prisustvoZaSedmicu","prisutan","odsutan","nijeUneseno"];
            let tabela = document.createElement("table");
            data = JSON.parse(data);
            console.log("Ispravno!",data[nazivi[0]]);
            nazivi.forEach(naziv => {
                let red = document.createElement("tr");
                let celija = document.createElement("td");
                celija.appendChild(document.createTextNode(naziv));
                celija.setAttribute("class","celija");
                red.appendChild(celija);
                celija = document.createElement("td");
                celija.appendChild(document.createTextNode(data[naziv]));
                celija.setAttribute("class","celija");
                red.appendChild(celija);
                tabela.appendChild(red);
            });
            document.getElementById("omotac").appendChild(tabela);
        }
    });
}