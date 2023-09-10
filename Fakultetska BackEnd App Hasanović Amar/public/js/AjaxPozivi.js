const AjaxPozivi = (()=>{

    function posaljiStudent(studentObjekat,callback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status==200){
                callback(null,ajax.responseText);
            }
            else if(ajax.readyState==4 && ajax.status==404){
                callback(ajax.statusText,null);
            }
        }
        ajax.open("POST","http://localhost:3000/student",true);
        ajax.setRequestHeader("Content-Type","application/json");
        ajax.send(JSON.stringify(studentObjekat));
    }
    
    function posaljiPredmet(predmetObjekat,callback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status==200){
                callback(null,ajax.responseText);
            }
            else if(ajax.readyState==4 && ajax.status==404){
                callback(ajax.statusText,ajax.responseText);
            }
        }
        ajax.open("POST","http://localhost:3000/predmet",true);
        ajax.setRequestHeader("Content-Type","application/json");
        ajax.send(JSON.stringify(predmetObjekat));
    }
    
    function posaljiPrisustvo(prisustvoObjekat,callback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status==200){
                callback(null,ajax.responseText);
            }
            else if(ajax.readyState==4 && ajax.status==404){
                callback(ajax.statusText,null);
            }
        }
        ajax.open("POST","http://localhost:3000/prisustvo",true);
        ajax.setRequestHeader("Content-Type","application/json");
        ajax.send(JSON.stringify(prisustvoObjekat));
    }

    function dajPrisustvo(kodPredmeta, indexStudenta, sedmica, callback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status==200){
                callback(null,ajax.responseText);
            }
            else if(ajax.readyState==4 && (ajax.status==404 || ajax.status==500)){
                callback(ajax.statusText,ajax.responseText);
            }
        }
        ajax.open("GET","http://localhost:3000/prisustvo?kodPredmeta="+kodPredmeta+"&indexStudenta="+indexStudenta+"&sedmica="+sedmica,true);
        ajax.send();
    }

    return{
        dajPrisustvo,posaljiPredmet,posaljiStudent,posaljiPrisustvo,
    };
})();
