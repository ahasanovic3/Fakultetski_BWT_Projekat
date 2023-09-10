function potvrdi(){
    var nazivPredmeta = document.getElementById("nazivPredmeta");
    var kodPredmeta = document.getElementById("kodPredmeta");
    var objekat = {"naziv":nazivPredmeta.value, "kod":kodPredmeta.value};
    console.log("Objekat",objekat);
    AjaxPozivi.posaljiPredmet(objekat,function(error,data){
        document.getElementById("prostor_za_poruku").removeChild(document.getElementById("prostor_za_poruku").lastChild)
        if(error!=null){
            console.log("Greska!");
            document.getElementById("prostor_za_poruku").appendChild(document.createTextNode(data));
            document.getElementById("prostor_za_poruku").setAttribute("style","color: red; font-size: 15px; font-weight: bold; margin: 0 30%; padding-top: 15px");
        }
        else{
            console.log("Ispravno!",data);
            document.getElementById("prostor_za_poruku").appendChild(document.createTextNode(data));
            document.getElementById("prostor_za_poruku").setAttribute("style","color: green; font-size: 15px; font-weight: bold; margin: 0 30%; padding-top: 15px");
        }
    });
}