class Personaje {

    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.dead = false;
    }

    getX() {
        return this.posX;
    }

    getY() {
        return this.posY;
    }

    setX(x) {
        this.posX = x;
    }

    setY(y) {
        this.posY = y;
    }

    getDead(){
        return this.dead;
    }

    setDead(dead){
        this.dead = dead;
    }

    jump() {
        this.setSaltando(true);
        return true;
    }

    slide(){
        this.setAgachado(true);
        return this.agachado;
    }

    caer() {
        if (this.getSaltando) {
            this.setSaltando(false);
            return true;
        }
    }

}