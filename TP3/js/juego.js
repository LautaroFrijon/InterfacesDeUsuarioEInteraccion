class Juego{

    constructor(){
        this.pj = new Personaje();
        this.obstaculos = [];
    }

    /*getOsbtaculos(){
        return this.obstaculos[0];
    }*/

    /*CalcularDesplazamiento() {
        return velEscenario * deltaTime * gameVel;
    }*/

    score(score){
        let interval
        if(!this.ifColision()){
            interval = setInterval(()=>{
                score+=10;
                document.querySelector(".puntaje").innerHTML = score;
            },500);
        }
        return interval;
    }

    pararScore(score){
        let interval = this.score(score);
        clearInterval(interval);
    }

    getPosition(personaje) {
        let top = personaje.getBoundingClientRect().top + window.scrollY; 
        let left = personaje.getBoundingClientRect().left + window.scrollX;
        return {
            top: top,
            left: left
        }
    }

    getSize(personaje) {
        let width = personaje.offsetWidth;
        let height = personaje.offsetHeight;
        return {
            width: width,
            height: height
        }
    }

    generarObstaculo(){
        let probabilidad = Math.random();
        let obstaculoAlto = false;
        let obstaculo = document.querySelector(".box-obstaculo");
        let posX;
        let posY;
        console.log(probabilidad);
        /*let posX = container.getBoundingClientRect().left + window.scrollX;
        let posY = container.getBoundingClientRect().top;*/
        if(probabilidad > 0.5){
            posX = obstaculo.getBoundingClientRect().left + window.scrollX;
            posY = obstaculo.getBoundingClientRect().top;
            let obstaculoObj = new Obstaculo(posX, posY, true);
            this.obstaculos.push(obstaculoObj);
        }
        else{
            posX = obstaculo.getBoundingClientRect().left + window.scrollX;
            posY = obstaculo.getBoundingClientRect().top;
            let obstaculoObj = new Obstaculo(posX, posY, true);
            this.obstaculos.push(obstaculoObj);
            obstaculo.classList.add("box-obstaculo-move-up");
            obstaculoAlto = true;
        }
        console.log(this.obstaculos);
        console.log(obstaculoAlto);
        this.moverObstaculo(obstaculo, obstaculoAlto);
    }

    moverObstaculo(obstaculo, obstaculoAlto){
        let posActual;
        if(obstaculoAlto){
           posActual = obstaculo.getBoundingClientRect().left;
            if(posActual <= 1222 && posActual > 0){
                posActual -= 20;
                obstaculo.style.left = posActual + "px";
                console.log(posActual);
            }
            obstaculo.classList.add("box-obstaculo-move-up")
        }
        else{
            posActual = obstaculo.getBoundingClientRect().left;
            if(posActual <= 1222 && posActual > 0){
                posActual -= 20;
                obstaculo.style.left = posActual + "px";
                console.log(posActual);
            }
            obstaculo.classList.add("box-obstaculo-move");
        }
    }

    detectarColision() {
        let personaje = document.querySelector(".box-personaje");
        let obstaculo = document.querySelector(".box-obstaculo");

        let pjX = this.getPosition(personaje).top;
        let pjY = this.getPosition(personaje).left;
        let pjW = this.getSize(personaje).width;
        let pjH = this.getSize(personaje).height;
        let osbtaculoX = this.getPosition(obstaculo).top;
        let osbtaculoY = this.getPosition(obstaculo).left+56;
        let osbtaculoW = this.getSize(obstaculo).width;
        let osbtaculoH = this.getSize(obstaculo).height;
        //Transformo a json
        let infoPj = { x: pjX, y: pjY, width: pjW, height: pjH }
        let infoObs = { x: osbtaculoX, y: osbtaculoY, width: osbtaculoW, height: osbtaculoH }
        //retorno verdadero si se detecta la colision
        if (infoPj.x < infoObs.x + infoObs.width &&
            infoPj.x + infoPj.width > infoObs.x &&
            infoPj.y < infoObs.y + infoObs.height &&
            infoPj.height + infoPj.y > infoObs.y) {
            console.log("colisión detectada");
            return true;
        }
        //Si no detecta colision retorna false
        return false;
    }

    ifColision(){
        let pj = document.querySelector(".box-personaje");
        let fondo = document.querySelector(".background");
        let suelo = document.querySelector(".suelo");
        let caja = document.querySelector(".box-obstaculo");
        if (this.detectarColision()) {
            this.perder(fondo, pj, suelo, caja);
            return true;
        }
        return false;
    }

    resumeGame(fondo, pj,suelo,caja){
        fondo.style["animation-play-state"] = "running";
        suelo.style["animation-play-state"] = "running";
        caja.style["animation-play-state"] = "running";
        pj.style["animation-play-state"] = "running";
        //pj.classList.add("box-personaje-walk");
    }

    pause(fondo, pj, suelo, caja, score){
        fondo.style["animation-play-state"] = "paused";
        suelo.style["animation-play-state"] = "paused";
        caja.style["animation-play-state"] = "paused";
        pj.style["animation-play-state"] = "paused";
        this.pararScore(score);
    }

    perder(fondo, pj,suelo,caja){
        fondo.style["animation-play-state"] = "paused";
        suelo.style["animation-play-state"] = "paused";
        caja.style["animation-play-state"] = "paused";
        pj.classList.remove("box-personaje-walk");
        pj.classList.add("box-personaje-dead");
    }

    /*IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
        let aRect = a.getBoundingClientRect();
        let bRect = b.getBoundingClientRect();
        return !(
            ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
            (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
            ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
            (aRect.left + paddingLeft > (bRect.left + bRect.width))
        );
    }
        
    DetectarColision() {
        let pj = document.querySelector(".box-personaje");
        let fondo = document.querySelector(".background");
        let suelo = document.querySelector(".suelo");
        let caja = document.querySelector(".box-obstaculo");
        let obsPosX = getPosition(caja);
        let pjPosX = getPosition(pj);
       
        for (var i = 0; i < obstaculos.length; i++) {
            if(obsPosX > pjPosX + pj.clientWidth) {
                //EVADE
                break; //al estar en orden, no puede chocar con más
            }else{
                if(IsCollision(pj, caja, 10, 30, 15, 20)) {
                    this.perder(fondo, pj, suelo, caja)
                }
            }
        }
    }*/
    
}