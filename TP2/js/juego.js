class Juego {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tablero = new Tablero(this.ctx);
        this.j1 = new Jugador(this.ctx, 'Jugador 1', 1);
        this.j2 = new Jugador(this.ctx, 'Jugador 2', 2);
        this.fichas = [];
        this.turno = 1;
        this.fichaActual = null;
        this.posInicialX;
        this.posInicialY;
        this.fichaClickeada = false;
        this.juegoFinalizado = false;
        this.cantidadFichas = 42;
        this.drawFichasInit();
        this.initJuego();
    }

    drawFichasInit() {
        this.drawFichasJugador(50, 'j1', this.j1);
        this.drawFichasJugador(920, 'j2', this.j2);
    }

    drawFichasJugador(xTmpInit, color, jugador) {
        var tmpY = 130;
        for (var fila = 0; fila < 7; fila++) {
            var tmpX = xTmpInit;
            for (var columna = 0; columna < 3; columna++) {
                var ficha = new Ficha(tmpX, tmpY, color, jugador);
                ficha.setContext(this.ctx);
                this.fichas.push(ficha);
                tmpX += 65;
            }
            tmpY += 65;
        }
    }

    initJuego() {
        this.tablero.dibujarTablero();
    }

    //llama al dibujar tablero 
    //setea las fichas
    //setea el primer turno
    prepareJuego() {
        this.tablero.dibujarTablero();
        this.setFichas();
        this.marcarTurnoActual();
    }

    setFichas() {
        for (var i = 0; i < this.fichas.length; i++) {
            this.fichas[i].dibujar();
        }
    }

    marcarTurnoActual() {
        if (this.turno === 1) {
            document.getElementById('J1').classList.add('turno-actual');
            document.getElementById('J2').classList.remove('turno-actual');
        }
        else if (this.turno === 2) {
            document.getElementById('J2').classList.add('turno-actual');
            document.getElementById('J1').classList.remove('turno-actual');
        }
        else {
            document.getElementById('J1').classList.remove('turno-actual');
            document.getElementById('J2').classList.remove('turno-actual');
        }
    }

    isClickedFicha(x, y) {
        for (var i = 0; i < this.fichas.length; i++) {
            var fichaTmp = this.fichas[i];
            if (fichaTmp.isClicked(x, y) && fichaTmp.getJugador() === this.turno && fichaTmp.getEstado() !== 'inactiva' && !this.juegoFinalizado) {
                this.fichaActual = fichaTmp;
                this.fichaClickeada = true;
                this.fichas.splice(i, 1);
                this.posInicialX = this.fichaActual.x;
                this.posInicialY = this.fichaActual.y;
                return true;
            }
        }
    }

    hayFichaClickeada() {
        return this.fichaClickeada;
    }

    moveFicha(x, y) {
        this.fichaActual.x = x;
        this.fichaActual.y = y;
        this.fichas.push(this.fichaActual);
        this.prepareJuego();
    }

    resetFichaClickeada() {
        this.fichaActual = null;
        this.fichaClickeada = false;
    }


}