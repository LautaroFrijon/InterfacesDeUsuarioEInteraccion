//No llegamos a terminarlo para le entrega, para la reentrega lo vamos a tener cocinado. 
//Disculpas por entregar el trabajo incompleto
document.addEventListener("DOMContentLoaded", function () {

    let fondo = document.querySelector(".background");
    let personaje = document.querySelector(".box-personaje");
    let suelo = document.querySelector(".suelo");
    let obstaculo = document.querySelector(".box-obstaculo");
    let puntaje = document.querySelector(".puntaje");
    let juego = new Juego();
    let req;
    var score = 0;
    const btnPlayStop = document.querySelector("#btnIniciarPausar");

    //Eventos
    window.addEventListener("keydown", (e) => {
        keydown = true;
        ev = e;
    });

    window.addEventListener("keyup", (e) => {
        keydown = false;
        ev = e;
    });

    //jump
    document.addEventListener("keydown", activarJump);

    //Slide
    document.addEventListener("keydown", activarSlide);

    //walk
    document.addEventListener("keyup", activarWalk);
   
    //Pausa
    btnPlayStop.addEventListener("click", function(){
        if(btnPlayStop.classList.contains("iniciar") && !juego.ifColision()){
            juego.pause(fondo, personaje, suelo, obstaculo, puntaje);
            btnPlayStop.classList.toggle("iniciar");
            console.log("PAUSA");
        }else if(!juego.ifColision()){
            juego.resumeGame(fondo, personaje, suelo, obstaculo);
            btnPlayStop.classList.toggle("iniciar");
            console.log(juego.ifColision());
        }
    });

    juego.score(score);

    //GAME LOOP
    /*if(document.readyState === "complete" || document.readyState === "interactive"){
        setTimeout(Init, 1);
    }else{
        document.addEventListener("DOMContentLoaded", Init); 
    }

    function Init() {
        time = new Date();
      
        Loop();
    }

    function Loop() {
        deltaTime = (new Date() - time) / 1000;
        time = new Date();
        Update();
        requestAnimationFrame(Loop);
    }

    function Update() {
        if(person.getParado()) return;
   
        MoverObstaculos();
       
    
        velY -= gravedad * deltaTime;
    }*/

    //Funciones

    function colision(){
        if (juego.ifColision()) {
            window.cancelAnimationFrame(req);
        } else {
            req = window.requestAnimationFrame(colision);
        }
    }

    function activarWalk(){
        personaje.classList.add("box-personaje-walk");
    }

    function activarJump(ev){
        if((ev.key == "ArrowUp")){
            personaje.classList.add("box-personaje-jump");
        }
        setTimeout(function(){
            personaje.classList.remove("box-personaje-jump");
        }, 1000);
    }

    function activarSlide(ev){
        if((ev.key == "ArrowDown")){
            personaje.classList.add("box-personaje-slide");
        }
        setTimeout(function(){
            personaje.classList.remove("box-personaje-slide");
        }, 1000);
    }

    setTimeout(function(){
        juego.generarObstaculo();
    }, 1000);

    setInterval(function(){
        colision();
    },50);
    
});