class Personaje {

    constructor(posX, posY, parado, saltando, agachado) {
        this.posX = posX;
        this.posY = posY;
        this.parado = parado;
        this.saltando = saltando;
        this.agachado = agachado;
    }

    getX() {
        return this.posX;
    }

    getY() {
        return this.posY;
    }

    getWidth(){
        return this.width;
    }

    getHeigth(){
        return this.heigth;
    }

    getParado() {
        return this.parado;
    }

    getSaltando() {
        return this.saltando;
    }

    getAgachado(){
        return this.agachado;
    }

    setAgachado(agachado){
        this.agachado = agachado;
    }

    setX(x) {
        this.posX = x;
    }

    setY(y) {
        this.posY = y;
    }

    setWidth(width){
        this.width = width;
    }

    setHeigth(heigth){
        this.heigth = heigth;
    }

    setParado(parado) {
        this.parado = parado;
    }

    setSaltando(saltando) {
        this.saltando = saltando;
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