//No llegamos a terminarlo para le entrega, para la reentrega lo vamos a tener cocinado. 
//Disculpas por entregar el trabajo incompleto
document.addEventListener("DOMContentLoaded", function () {

    let personaje = document.querySelector(".box-personaje");
    let obstaculo = document.querySelector(".box-obstaculo");
    let person = new Personaje(2, 3, false, false, false);
    let obs = new Obstaculo(false)
    let juego = new Juego();
    let keydown;
    let ev;

    window.addEventListener("keydown", (e) => {
        keydown = true;
        ev = e;
    });

    window.addEventListener("keyup", (e) => {
        keydown = false;
        ev = e;
    })

    var time = new Date();

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

    //Eventos

    //jump
    document.addEventListener("keydown", activarJump);

    //Slide
    document.addEventListener("keydown", activarSlide);

    //walk
    document.addEventListener("keyup", activarWalk);

    window.requestAnimationFrame(colision);
    let req;

    function colision(){
        if (juego.ifColision()) {
            window.cancelAnimationFrame(req);
        } else {
            req = window.requestAnimationFrame(colision);
        }
    }

    //Funciones
    function activarWalk(){
            personaje.classList.add("box-personaje-walk");
    }

    function activarJump(ev){
        if(ev.key == "ArrowUp"){
            personaje.classList.add("box-personaje-jump");
        }
        setTimeout(function(){
            personaje.classList.remove("box-personaje-jump");
        }, 1000);
    }

    function activarSlide(ev){
        if(ev.key == "ArrowDown"){
            personaje.classList.add("box-personaje-slide");
        }
        setTimeout(function(){
            personaje.classList.remove("box-personaje-slide");
        }, 1000);
     }

    setTimeout(function(){
        juego.generarObstaculo();
    }, 1000);

});
