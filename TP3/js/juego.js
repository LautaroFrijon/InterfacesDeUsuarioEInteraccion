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

    getPosition(personaje) {
        let top = personaje.getBoundingClientRect().top +window.scrollY; 
        let left = personaje.getBoundingClientRect().left +window.scrollX;
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
        let container = document.querySelector(".box-obstaculo");
        let posX = container.getBoundingClientRect().left + window.scrollX;
        let posY = container.getBoundingClientRect().top;
        let obstaculo = new Obstaculo(this.playerSpaceShip);
        obstaculo.generarObstaculo(posX, posY);
        this.obstaculos.push(obstaculo);
        console.log(this.obstaculos);
        this.moverObstaculo(container);
        console.log(posX, posY);
    }

    moverObstaculo(container){
        let posActual;
        posActual = container.getBoundingClientRect().left;
            if(posActual <= 1222 && posActual > 0){
                posActual -= 20;
                container.style.left = posActual + "px";
                console.log(posActual);
            }
        
        container.classList.add("box-obstaculo-move");
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

    perder(fondo, pj,suelo,caja){
        fondo.style["animation-play-state"] = "paused";
        pj.style["animation-play-state"] = "paused";
        suelo.style["animation-play-state"] = "paused";
        caja.style["animation-play-state"] = "paused";
    }

    beforePlaying(){
        
    }

}