class Tablero {

    constructor(ctx) {
        this.ctx = ctx;
        this.ranuras = [];
        this.ranurasX = [];
        this.ranurasY = [];
        this.limiteY = 93;
        this.inicioRanuraGanadora = { 'x': -1, 'y': -1 };
        this.finalRanuraGanadora = { 'x': -1, 'y': -1 };
        this.direccionGanador = '';
        this.initRanuras();
    }

    dibujarTablero() {
        this.ctx.fillStyle = '#dbb6bc';
        this.ctx.fillRect(0, 0, 1100, 550);
        this.ctx.fillStyle = "#eb0004";
        this.ctx.fillRect(260, 95, 600, 460);
        for (let columna = 0; columna < this.ranurasX.length; columna++) {
            for (let fila = 0; fila < this.ranurasY.length; fila++) {
                var ficha = this.ranuras[this.ranurasY[fila] + '-fila'][this.ranurasX[columna] + '-columna'];
                ficha.dibujar();
            }
        }
    }

    initRanuras() {
        var diferenciaX = 95;
        var diferenciaY = 65;
        var fxInit = 320;
        var fy = 130;
        for (let y = 0; y < 7; y++) {
            var fx = fxInit;
            this.ranuras[fy + '-fila'] = [];
            for (let x = 0; x < 6; x++) {
                var ficha = new Ficha(fx, fy, 'ranuras', 0);
                ficha.setContext(this.ctx);
                this.ranuras[fy + '-fila'][fx + '-columna'] = ficha;
                this.ranurasX.push(fx);
                fx += diferenciaX;
            }
            this.ranurasY.push(fy);
            fy += diferenciaY;
        }
    }





}