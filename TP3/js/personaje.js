class Personaje{

    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }

    jump(e) {
        if(e.keyCode == 32){
            personaje.style.animationName = "jump";
        }
    }

    

}