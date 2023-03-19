var niveau=0
var lettreencours=0
var phrasesreussies=0
var countdown=40000
var countdownmax=40000
const timeinterval=200
var istyping=false

const menu=document.getElementById('menu')
const gamecontainer=document.getElementById('gamecontainer')
const gameover=document.getElementById('gameover')
const motcle=document.getElementById('motcle')
const input=document.getElementById('input')
const output=document.getElementById('output')
const messagein=document.getElementById('messagein')
const messageout=document.getElementById('messageout')
const typing=document.getElementById('typing')
const perso1=document.getElementById('perso1')
const perso2=document.getElementById('perso2')
const progress=document.getElementById('progressbar')

messageout.volume=0.3
messagein.volume=0.3
typing.volume=0.3

setInterval(checkCountdown,timeinterval)

function checkCountdown(){
    if (istyping){
        countdown=countdown-timeinterval
        if (countdown==0){
        istyping=false
        isAngry()
        } else {
        let x=countdown/countdownmax*100
        progress.value=parseInt(x)
        console.log (countdown)
        }
    }
    

}

function chargerNiveau(lvl){
    //changerletitre
    motcle.innerHTML=niveaux[lvl].nom
    perso1.style.backgroundImage="url('"+niveaux[lvl].prota1+"')"
    perso2.style.backgroundImage="url('"+niveaux[lvl].prota2+"')"
    chargerPhrase()
    
}
function chargerPhrase(){
    //randomiser la phrase à afficher
    let r = getRandomInt(niveaux[niveau].phrases.length)
    //parser la phrase pour l'affichage
    parsePhrase(r)
}
function effacerPhrase(){
    let allitems = Array.from(document.getElementsByClassName('lettre'));
    allitems.forEach(item => {
     item.remove();
    });
}
function effacerMessages(){
    let allitems = Array.from(document.getElementsByClassName('message'));
    allitems.forEach(item => {
     item.remove();
    });
    allitems = Array.from(document.getElementsByClassName('pattedebulle'));
    allitems.forEach(item => {
     item.remove();
    });
    allitems = Array.from(document.getElementsByClassName('pattedebulle2'));
    allitems.forEach(item => {
     item.remove();
    });
}
var phrase

function parsePhrase(random){    
    phrase=niveaux[niveau].phrases[random]
    console.log(phrase.length+" "+phrase)
    for (i=0;i<phrase.length;i++){
        let div=document.createElement('div')
        div.id=i
        div.innerHTML=phrase[i]
        div.classList.add('lettre')
        input.appendChild(div)
    }
    document.getElementById('0').classList.add('totype')
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function niveauReussi(){
    console.log("niveau réussi")
}

function envoyerSMS(){
    montrerProta1()
    cacherProta2()
    let div=document.createElement('div')
    div.innerHTML=phrase
    div.classList.add('message')
    div.classList.add('fromleft')
    output.appendChild(div)
    let patte=document.createElement('div')
    patte.classList.add('pattedebulle')
    output.appendChild(patte)
    let scroll=div.offsetHeight + div.offsetTop+patte.offsetHeight + patte.offsetTop
    document.getElementById('output').scrollTop = div.offsetHeight + div.offsetTop; 
    messageout.play();
}
var m=0
function envoyerSMS2(msg,interval){
    cacherProta1()
    montrerProta2()
    setTimeout(()=>{
        let id="m"+m
        let div=document.createElement('div')
        div.innerHTML="..."
        div.id=id
        div.classList.add('message')
        div.classList.add('fromright')
        output.appendChild(div)
        document.getElementById('output').scrollTop = div.offsetHeight + div.offsetTop; 
        setTimeout(()=>{
            document.getElementById(id).innerHTML=msg
            let patte=document.createElement('div')
            patte.classList.add('pattedebulle2')
            output.appendChild(patte)
            let scroll=div.offsetHeight + div.offsetTop+patte.offsetHeight + patte.offsetTop
            document.getElementById('output').scrollTop = scroll; 
            messagein.play();
            m=m+1
        },4000)
    }, interval)       
}

function reponseRandom(){
    let x=getRandomInt(reponses.length)
    return reponses[x]
}
function venerRandom(){
    let x=getRandomInt(vener.length)
    return vener[x]
}

function reponseProta(){
    let x=reponseRandom()
        envoyerSMS2(x,0)
    let y=reponseRandom()
        envoyerSMS2(y,5000)
    let z=reponseRandom()
        envoyerSMS2(z,10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
}
function isAngry(){
    effacerPhrase()
    istyping=false
    
    cacherInputbox()
    setTimeout(()=>{
        lettreencours=0
        countdown=countdownmax
        progress.value=100
        chargerPhrase()},4000)
    let x=venerRandom()
        envoyerSMS2(x,0)
    let y=venerRandom()
        envoyerSMS2(y,5000)
    let z=venerRandom()
        envoyerSMS2(z,10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
}


function introductionNiveau (stage){
    if (stage==0){
        gamecontainer.style.backgroundColor="#33415d"
        envoyerSMS2("T ou BB 😘",0)
        envoyerSMS2("Tu m'évites ou quoi 😐",5000)
        envoyerSMS2("écris moi stp 🙁 tu disparais tout le tps ça saoule jpp",10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
    }
    if (stage==1){
        gamecontainer.style.backgroundColor= "#800020"
        envoyerSMS2("T ou Cendrillon 😘",0)
        envoyerSMS2("Tt le monde t'attend tu fais quoi 😐",5000)
        envoyerSMS2("tu disparais tout le tps ça saoule jpp",10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
    }
    if (stage==2){
        gamecontainer.style.backgroundColor= "#83a258"
        envoyerSMS2("Salut BB 😘",0)
        envoyerSMS2("J'ai le bourdon, t'es où 😐",5000)
        envoyerSMS2("tu disparais butiner tt le tps ça saoule jpp",10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
    } 
    if (stage==3){
        gamecontainer.style.backgroundColor= "#005314"
        envoyerSMS2("Salut BB c'est le lapin blanc 😘",0)
        envoyerSMS2("t'es perdu dans la matrice? 😐",5000)
        envoyerSMS2("tu disparais tt le tps jpp",10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
    } 
    if (stage==4){
        gamecontainer.style.backgroundColor= "#6995ab"
        envoyerSMS2("Salut grande soeur😘",0)
        envoyerSMS2("tu veux faire un bonzom de neige? 😐",5000)
        envoyerSMS2("tu disparais tt le tps jpp",10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
    } 
    if (stage==5){
        gamecontainer.style.backgroundColor= "#863a96"
        envoyerSMS2("Salut BB😘",0)
        envoyerSMS2("j'espère que t'es pas au bar 😐",5000)
        envoyerSMS2("tu disparais tt le tps jpp",10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
    } 
    if (stage==6){
        gamecontainer.style.backgroundColor= "#ab6e69"
        envoyerSMS2("Salut mon héros😘",0)
        envoyerSMS2("je sais que tu m'captes avec tes super oreilles 😐",5000)
        envoyerSMS2("tu disparais tt le tps jpp",10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
    } 
    if (stage==7){
        gamecontainer.style.backgroundColor= "#ab8d69"
        envoyerSMS2("Salut mon rappeur d'amour😘",0)
        envoyerSMS2("t'es pas venu à mon dernier concert 😐",5000)
        envoyerSMS2("tu disparais tt le tps jpp",10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
    } 
    if (stage==8){
        gamecontainer.style.backgroundColor= "#D8BFD8"
        envoyerSMS2("Salut Rouge😘",0)
        envoyerSMS2("tu viens fusionner nos robots? 😐",5000)
        envoyerSMS2("tu pars te battre tt le tps jpp",10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
    } 
    if (stage==9){
        gamecontainer.style.backgroundColor= "#be88e8"
        envoyerSMS2("Salut mon pouss1😘",0)
        envoyerSMS2("tu cours plus derriere batman que derriere moi 😐",5000)
        envoyerSMS2("moi aussi je veux rire avec toi jpp",10000)
        
        setTimeout(()=>{
            montrerInputbox()
            montrerProta1()
            cacherProta2()
        },14000)
        setTimeout(()=>{
            istyping=true
        },18000)
    } 
}

const prota1=document.getElementById('prota1')
const prota2=document.getElementById('prota2')
const inputbox=document.getElementById('inputbox')
function cacherInputbox(){
    inputbox.classList.add('invisible')
}
function montrerInputbox(){
    inputbox.classList.remove('invisible')
}
function cacherProta1(){
    prota1.classList.add('inactif')
}
function montrerProta1(){
    prota1.classList.remove('inactif')
}
function cacherProta2(){
    prota2.classList.add('inactif')
}
function montrerProta2(){
    prota2.classList.remove('inactif')
}


function niveauSuivant(){
    niveau=niveau+1
    if (niveau<10){
        phrasesreussies=0
        countdown=countdown-1000
        countdownmax=countdownmax-1000
        effacerMessages()
        chargerNiveau(niveau)
        introductionNiveau(niveau)
    } else {
        gameOver()
    }
}

function gameOver(){
    menu.classList.add('hidden')
    gamecontainer.classList.add('hidden')
    gameover.classList.remove('hidden')
    console.log ("gameover")

}
//verifier l'input du clavier

document.addEventListener('keydown', (event) => {
    var keyName = event.key;
    var keyCode = event.code;
    //console.log(`Keydown: The key pressed is ${keyName} and its code value is ${keyCode}`);
    if (keyName==phrase[lettreencours]){
        document.getElementById(lettreencours).classList.remove('totype')
        document.getElementById(lettreencours).classList.add('typed')
        lettreencours=lettreencours+1
        typing.play()
        if (lettreencours==phrase.length){
            phrasesreussies=phrasesreussies+1
            if (phrasesreussies<5){
                envoyerSMS()
                effacerPhrase()
                istyping=false
                
                cacherInputbox()
                setTimeout(()=>{
                    lettreencours=0
                    countdown=countdownmax
                    progress.value=100
                    chargerPhrase()},4000)
                reponseProta()
            } else {
                envoyerSMS()
                effacerPhrase()
                istyping=false
                
                cacherInputbox()
                setTimeout(()=>{
                    lettreencours=0
                    countdown=countdownmax
                    progress.value=100
                    niveauSuivant()
                },4000)
                
            }

            }     
        } else {
            document.getElementById(lettreencours).classList.add('totype')
        }
        
      

  }, false);

  //debut du jeu


function startGame(){
    menu.classList.add('hidden')
    gamecontainer.classList.remove('hidden')
    chargerNiveau(niveau)
    introductionNiveau(niveau)
}

const start=document.getElementById('start')
start.addEventListener('click',startGame)