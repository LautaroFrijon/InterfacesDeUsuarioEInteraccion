class obstaculo {



    constructor(posX, posy, tiempoObstaculoMin, tiempoObstaculoMax) {
        this.posX = posX;
        this.posy = posy;
        this.tiempoObstaculoMax = tiempoObstaculoMax;
        this.tiempoObstaculoMin = tiempoObstaculoMin;
        this.obstaculos = [];
    }




    CrearObstaculo() {
        var obstaculo = document.createElement("div");
        let contenedor = document.querySelector(".box-personaje");
        contenedor.appendChild(obstaculo);
        obstaculo.classList.add("obstaculo");
        obstaculo.posX = contenedor.clientWidth;
        obstaculo.style.left = contenedor.clientWidth + "px";
        this.obstaculos.push(obstaculo);
        //tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;
    }
}