//No llegamos a terminarlo para la entrega, para la reentrega lo vamos a tener cocinado. 
//Disculpas por entregar el trabajo incompleto
document.addEventListener("DOMContentLoaded", function () {

    var score = 0;
    let fondo = document.querySelector(".background");
    let personaje = document.querySelector(".box-personaje");
    let suelo = document.querySelector(".suelo");
    let obstaculo = document.querySelector(".box-obstaculo");
    let hongo = document.querySelector(".box-hongo");
    let puntaje = document.querySelector(".puntaje");
    let juego = new Juego(score);
    var interval;
    var scoreInterval;
    let req;

    const btnRestart = document.querySelector("#restart");
    
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

    btnRestart.addEventListener("click", function(){
        juego.replay();
    });
   
    scoreInterval = juego.scoreHandle();

    //Pausa
    btnPlayStop.addEventListener("click", function(e){
        if(btnPlayStop.classList.contains("iniciar" || juego.getPj().getDead() == false)){
            juego.pause(fondo, personaje, suelo, obstaculo, hongo);
            btnPlayStop.classList.toggle("iniciar");
            stopScore();
            console.log("PAUSA");
        }else if(juego.getPj().getDead() == false){
            juego.resumeGame(fondo, personaje, suelo, obstaculo, hongo);
            btnPlayStop.classList.toggle("iniciar");
            console.log("PLAY");
        }
    });

    //GAME LOOP
    interval = setInterval(function(){
        if(juego.getPj().getDead() == false){
            juego.generarObstaculo();
            juego.generarHongo();
            colision();
        } else if(juego.getPj().getDead() == true || juego.pause()){
            stopLoop(interval);
            console.log("Entra a cortar el loop");
        }
    },4000);

    //Funciones
    function stopLoop(interval){
        clearInterval(interval);
    }

    function stopScore(){
        clearInterval(scoreInterval);
    }

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

 
});