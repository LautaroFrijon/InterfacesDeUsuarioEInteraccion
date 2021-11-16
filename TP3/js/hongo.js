class Hongo extends Obstaculo{

    constructor(){
        super();
        this.score = 1000;
    }

    getScore(){
        return this.score;
    }

    setScore(score){
        this.score = score;
    }

}