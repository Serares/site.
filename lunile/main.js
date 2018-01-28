
var listaVeg = document.querySelector('.veg-ul-list');
var listaLuni = document.getElementById('lista');
var listaFood = document.getElementById('lista1');
var btn1 = document.getElementsByClassName('dropbtn1');
var imagine = document.querySelector('.imagine');
var divVegetale = document.querySelector('.vegetale');
var dropdown = document.querySelector('.dropdown');
var dropFoodDiv = document.querySelector('.dropdownFood');


// adaug calea catre fisiere;
    var despre = document.querySelector('.despre');
        var ds = despre.querySelector('a');
    var atr = '../../footer/despre/despre.html';
    ds.setAttribute('href',atr);

// funtie pentru dropdown;
// cand apas pe imaginile de pe butoane nu functioneaza, trebuie sa pun functia si pe imagini si sa fac conditii in care sa apara clasa show pe lista Daca are deja clasa sa nu o puna si daca are sa o puna 
// animatie la sageti 

var downarr1 = document.querySelector('.downarrow1');
var downarr2 = document.querySelector('.downarrow2');

dropdown.addEventListener('click',function(){
    downarr1.classList.toggle('downarrow1d');
});

// se intoarce cand apasi in afara dropdown;

window.addEventListener('click',function(e){
    if(!e.target.matches('.dropbtn')){
        var imgs = document.getElementsByClassName('downarrow1');
        var i;
        for (i=0;i<imgs.length;i++){
            var rotateImg = imgs[i];
            if(rotateImg.classList.contains('downarrow1d')){
                rotateImg.classList.remove('downarrow1d');
            }
        }
    }
})
    // pentru produse
dropFoodDiv.addEventListener('click',function(){
    downarr2.classList.toggle('downarrow2d');
});

// se intoarce cand apasi in afara dropdown;

window.addEventListener('click',function(e){
    if(!e.target.matches('.dropbtn1')){
        var imgs = document.getElementsByClassName('downarrow2');
        var i;
        for (i=0;i<imgs.length;i++){
            var rotateImg = imgs[i];
            if(rotateImg.classList.contains('downarrow2d')){
                rotateImg.classList.remove('downarrow2d');
            }
        }
    }
})

// pentru lista sa apara si sa dispara;

dropdown.addEventListener('click',function(){
    listaLuni.classList.toggle('show');
});

// functie sa dispara lista de dropdown cand apesi in afara lui si imaginea sa se intoarca la normal;
window.addEventListener('click',function(e){
    if(!e.target.matches('.dropbtn')){
        var dropdowns = document.getElementsByClassName('dropdown-content');
        var i;
        for (i=0;i<dropdowns.length;i++){
            var openDropdown = dropdowns[i];
            if(openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show');
            }
        }
    }
})



dropFoodDiv.addEventListener('click',function(){
    listaFood.classList.toggle('show1');
});

window.addEventListener('click',function(e){
    if(!e.target.matches('.dropbtn1')){
        var dropdowns = document.getElementsByClassName('dropdown-content1');
        var i;
        for (i=0;i<dropdowns.length;i++){
            var openDropdown = dropdowns[i];
            if(openDropdown.classList.contains('show1')){
                openDropdown.classList.remove('show1');
            }
        }
    }
});


    // trebuie sa afisez luna in care ne aflam si sa afisez pe pagina principala doar vegetalele ce cresc in acea luna :D;
    var titluVeg = document.querySelector('#titluVeg');
    
    var data = new Date();
    var month = titluVeg.innerHTML;
    var day = data.toLocaleDateString('ro-RO', {day:"numeric"});
   
    var afiseazaTitlu = "produsele disponibile in luna "+ month;
    titluVeg.innerHTML = afiseazaTitlu.toUpperCase(); 

    // if(day <= 15 ){
    //     var afiseazaTitlu = "produsele disponibile la inceputul lunii "+ month;
    //     titluVeg.innerHTML = afiseazaTitlu.toUpperCase();
    // } else {
    //     var afiseazaTitlu = "produsele disponibile la sfarsitul lunii "+ month;
    //     titluVeg.innerHTML = afiseazaTitlu.toUpperCase();
    // }

    // afiseaza luna selectata pe buton; 
    var lunaAf = document.querySelector('.lunaAf');
    String.prototype.firstLetter = function(){
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    lunaAf.innerHTML = month.firstLetter();

    if(month === "ianuarie" || month ==="februarie" || month ==="decembrie"){
        imagine.style.backgroundImage = "url(../style/img/iarna.jpg)";
    } else if(month === "martie" || month ==="aprilie" || month ==="mai" ){
        imagine.style.backgroundImage = "url(../style/img/primavara3.jpg)";
    } else if (month === "iunie" || month ==="iulie" || month ==="august" ){
        imagine.style.backgroundImage = "url(../style/img/vara6.jpg)";
    } else if(month === "septembrie" || month ==="octombrie" || month ==="noiembrie"){
        imagine.style.backgroundImage = "url(../style/img/livada2.jpg)";
    }
        
    
        

    // creez elemente cu JS si le atribui datele din fisierul JSON;
    // din fisierul local json iau datele cu reqJson;
    
    // cerere XML ;
    var reqJson = new XMLHttpRequest();

    reqJson.open('GET','vegetale.json');

    reqJson.onreadystatechange = function(){

        if(reqJson.readyState === 4){

            if(reqJson.status ===200 || reqJson.status === 0){

        // afisez doar obiectele care au keya luna cu valoarea egala cu variabila month;

        var date = JSON.parse(reqJson.responseText);
        console.log(date.length);

        // sortez datele in ordine alfabetica dupa Titlu;
        date.sort(function(a,b){
            if(a.titlu < b.titlu)
                return -1;
            if(a.titlu > b.titlu)
                return 1;
            return 0;
        });
        
        var content1 = document.querySelector('.dropdown-content1');
        //  creez anchor-uri din lista de produse :D
        for(let i = 0; i<date.length;i++){
            var anchr = document.createElement('a');
            anchr.textContent = date[i].titlu;
            anchr.setAttribute('href', date[i].linkprodus);
            content1.appendChild(anchr);
        }

        for(let i = 0; i<date.length;i++){

            for(let key in date[i].luna){
                let obj = date[i].luna[key];

                // console.log(obj);

                if(obj === month){

        var vegli = document.createElement('li');
        var vegCard = document.createElement('div');
        // anchorul are href ca si linkul;
        var a = document.createElement('a');
        // acesta are src link-imagine din json;
        var img = document.createElement('img');
            
        var cardBlock = document.createElement('div');  
        // acesta are textContent titlul din json
        var cardTitle = document.createElement('h3'); 
        // vegDescriere are un element p ce contine descriere din json;
        var vegDesc = document.createElement('div');
        var para = document.createElement('p');
        var vegLink = document.createElement('div');
        var textLink = document.createElement('a');

            // atribui child respectiv;
        vegli.appendChild(vegCard);
        vegCard.appendChild(a);
        vegCard.appendChild(cardBlock);
        a.appendChild(img);
        cardBlock.appendChild(cardTitle);
        cardBlock.appendChild(vegDesc);
        cardBlock.appendChild(vegLink);
        vegDesc.appendChild(para);
        vegLink.appendChild(textLink);
        listaVeg.appendChild(vegli);
            
            // setez atribute

        vegli.setAttribute('class', 'veg-li');
        vegCard.setAttribute('class','veg-card');
        a.setAttribute('href', date[i].linkprodus);
        img.setAttribute('src',date[i].imagine);
        img.setAttribute('alt', date[i].altimagine);
        cardBlock.setAttribute('calss','card-block');
        cardTitle.setAttribute('class','card-title');
        cardTitle.textContent = date[i].titlu;
        vegDesc.setAttribute('class','veg-desc');
        para.textContent = date[i].descriere;
        vegLink.setAttribute('class','veg-link');
        textLink.setAttribute('class','btn-link');
        // linkul catre produs;
        textLink.setAttribute('href',date[i].linkprodus);
        // textLink.setAttribute('target','blank_');
        textLink.textContent = 'Sezonalitate';
                        }
                    }
                }
            }
        
        
        }


    }
    reqJson.send();


    
// in caz ca sunt mai putine cartonase trebuie sa scad inaltimea divului .vegetale;

    
    
    
