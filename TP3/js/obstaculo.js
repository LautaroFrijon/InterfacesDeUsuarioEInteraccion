class Obstaculo {

    constructor(posX, posY, hidden) {
        this.posX = posX;
        this.posY = posY;
        this.personaje = null;
        this.obstaculo = null;
        this.hidden = hidden;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getWidth(){
        return this.width;
    }

    getHeigth(){
        return this.heigth;
    }
    
    getTiempoObstaculoMax(){
        return this.tiempoObstaculoMax;
    }

    getTiempoObstaculoMin(){
        return this.tiempoObstaculoMin;
    }

    getHidden(){
        return this.hidden;
    }

    getOsbtaculos(){
        return this.obstaculos;
    }

    setHidden(hidden){
        this.hidden = hidden;
    }

    setPosX(x){
        this.posX = x;
    }

    setPosY(y){
        this.posY = y;
    }

    setWidth(width){
        this.width = width;
    }

    setHeigth(heigth){
        this.heigth = heigth;
    }

    setTiempoObstaculoMax(time){
        this.tiempoObstaculoMax = time;
    }

    setTiemporObstaculoMin(time){
        this.tiempoObstaculoMin = time;
    }

    /*generarObstaculo(posX, posY) {
        this.obstaculo = document.createElement("div");
        //this.obstaculo.setAttribute("class", "box-obstaculo");
        this.obstaculo.style.left = posX.x + 'px';
        this.obstaculo.style.top = posY.y + 'px';
        document.querySelector(".background").appendChild(this.obstaculo);  
        console.log("obstaculoagregado");
    }*/

}