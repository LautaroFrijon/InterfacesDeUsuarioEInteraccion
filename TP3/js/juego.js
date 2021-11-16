class Juego{

    constructor(score){
        this.pj = new Personaje();
        this.obstaculos = [];
        this.hongos = [];
        this.score = score;
    }

    getPj(){
        return this.pj;
    }

    getScore(){
        return this.score;
    }

    setScore(score){
        this.score = score;
    }

    scoreHandle(){
        let interval;
        let personaje = document.querySelector(".box-personaje");
        let boxHongo = document.querySelector(".box-hongo");
        if(!this.ifColision()){
            interval = setInterval(()=>{
            if(this.detectarColision(personaje, boxHongo)){
                console.log("Entra");
                this.score += 1000;
                boxHongo.style.visibility = "hidden";
                this.hongos.splice(0,1);
                console.log(this.hongos);
            }
                this.score += 10;
                document.querySelector(".puntaje").innerHTML = this.score;
            },500);
            console.log("puntaje "+this.score);
        }
        return interval;
    }

    replay(){
        this.score = 0;
        document.querySelector(".puntaje").innerHTML = this.score;
        let pj = document.querySelector(".box-personaje");
        let fondo = document.querySelector(".background");
        let suelo = document.querySelector(".suelo");
        let caja = document.querySelector(".box-obstaculo");
        let hongo = document.querySelector(".box-hongo");

        
        fondo.style
        pj.classList.remove("box-personaje-jump");
        pj.classList.remove("box-personaje-dead");
        pj.classList.remove("box-personaje-slide");
        //pj.classList.add("box-personaje-walk");
        caja.classList.remove("box-obstaculo-move");
        caja.classList.remove("box-obstaculo-move-up");
        hongo.classList.remove("box-hongo-move1");
        hongo.classList.remove("box-hongo-move2");
        fondo.style["animation-play-state"] = "running";
        suelo.style["animation-play-state"] = "running";
        caja.style["animation-play-state"] = "running";
        pj.style["animation-play-state"] = "running";
        hongo.style["animation-play-state"] = "running";
        if(this.ifColision()){
            caja.classList.add("box-obstaculo-move");
            caja.classList.add("box-obstaculo-move-up");
            hongo.classList.add("box-hongo-move1");
            hongo.classList.add("box-hongo-move2");
        }
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

    generarHongo(){
        let boxHongo = document.querySelector(".box-hongo");
        let posX = boxHongo.getBoundingClientRect().left + window.scrollX;
        let posY = boxHongo.getBoundingClientRect().top;
        let hongo = new Obstaculo(posX, posY, true, true);
        this.hongos.push(hongo);
        console.log(this.hongos);
        this.moverHongo(boxHongo);
    }

    moverHongo(boxHongo){
        let probabilidad = Math.random();
        let posActual;
        posActual = boxHongo.getBoundingClientRect().left;
        if(posActual <= 1222 && posActual > 0){
            posActual -= 20;
            boxHongo.style.left = posActual + "px";
            console.log("hongo " + posActual);
        }
        if(probabilidad > 0.5){
            boxHongo.classList.remove("box-hongo-move2");
            boxHongo.classList.add("box-hongo-move1");
            boxHongo.style.visibility = "visible";
        } else {
            boxHongo.classList.add("box-hongo-move2");
            boxHongo.style.visibility = "visible";
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
            console.log("caja baja" +probabilidad);
            posX = obstaculo.getBoundingClientRect().left + window.scrollX;
            posY = obstaculo.getBoundingClientRect().top;
            let obstaculoObj = new Obstaculo(posX, posY, true, false);
            this.obstaculos.push(obstaculoObj);
            obstaculoAlto == false;
        }
        else{
            console.log("caja alta" +probabilidad);
            posX = obstaculo.getBoundingClientRect().left + window.scrollX;
            posY = obstaculo.getBoundingClientRect().top;
            let obstaculoObj = new Obstaculo(posX, posY, true, false);
            this.obstaculos.push(obstaculoObj);
            obstaculoAlto = true;
        }
        console.log(this.obstaculos);
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
            obstaculo.classList.add("box-obstaculo-move-up");
            obstaculo.style.visibility = "visible";
            if(this.ifColision() == false){
                this.obstaculos.splice(0,1);
            }
        }
        else{
            posActual = obstaculo.getBoundingClientRect().left;
            if(posActual <= 1222 && posActual > 0){
                posActual -= 20;
                obstaculo.style.left = posActual + "px";
                console.log(posActual);
            }
            obstaculo.classList.remove("box-obstaculo-move-up");
            obstaculo.classList.add("box-obstaculo-move");
            obstaculo.style.visibility = "visible";
            if(this.ifColision() == false){
                this.obstaculos.splice(0,1);
            }
        }
    }

    detectarColision(personaje, obstaculo) {
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
        let hongo = document.querySelector(".box-hongo");
        if (this.detectarColision(pj, caja)) {
            this.perder(fondo, pj, suelo, caja, hongo);
            return true;
        }
        return false;
    }

    resumeGame(fondo, pj, suelo, caja, hongo){
        if(!this.ifColision()){
            fondo.style["animation-play-state"] = "running";
            suelo.style["animation-play-state"] = "running";
            caja.style["animation-play-state"] = "running";
            pj.style["animation-play-state"] = "running";
            hongo.style["animation-play-state"] = "running";
        }
        //pj.classList.add("box-personaje-walk");
    }

    pause(fondo, pj, suelo, caja, hongo){
        fondo.style["animation-play-state"] = "paused";
        suelo.style["animation-play-state"] = "paused";
        caja.style["animation-play-state"] = "paused";
        pj.style["animation-play-state"] = "paused";
        hongo.style["animation-play-state"] = "paused";
    }

    perder(fondo, pj,suelo,caja, hongo){
        this.pj.setDead(true);
        fondo.style["animation-play-state"] = "paused";
        suelo.style["animation-play-state"] = "paused";
        caja.style["animation-play-state"] = "paused";
        hongo.style["animation-play-state"] = "paused";
        pj.classList.remove("box-personaje-walk");
        pj.classList.add("box-personaje-dead");
    }

   
    
}