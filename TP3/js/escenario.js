class Escenario{

    constructor(posx, posy, pj){
        this.posx = posx;
        this.posy = posy;
        this.pj = pj;
    }

    getX(){
        return this.posx;
    }

    getY(){
        return this.posy;
    }

    setX(posx){
        this.posx = posx;
    }

    setY(posy){
        this.posy = posy;
    }

    tocarSuelo() {
        this.pj.setY(sueloY);
        velY = 0;
        if(this.pj.getSaltando){
            pj.classList.add("box-personaje-walk");
        }
        this.pj.setSaltando(false);
    }

}