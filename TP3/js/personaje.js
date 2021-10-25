class Personaje{

    constructor(posX, posY, parado, saltando){
        this.posX = posX;
        this.posY = posY;
        this.parado = parado;
        this.saltando = saltando;
    }

    getX(){
        return this.posX;
    }

    getY(){
        return this.posY;
    }

    getParado(){
        return this.parado;
    }

    getSaltando(){
        return this.saltando;
    }

    setX(x){
        this.posX = x;
    }

    setY(y){
        this.posY = y;
    }

    setParado(parado){
        this.parado = parado;
    }
    
    setSaltando(saltando){
        this.saltando = saltando;
    }
     
    jump(e){
        let tecla = e.key;
        if(tecla == "ArrowUp"){
            this.setSaltando(true);
            console.log("llega");
            return true;
        }

    }

   dejarSalto() {
    if(this.getSaltando){
        this.setSaltando(false);
        return true;
    }

}
  
}