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

    //Invoca al metodo drawFichasJugador(), pasandole los valores correspondientes, para que cree
    //las fichas del jugadores 1 y 2.
    drawFichasInit() {
        this.drawFichasJugador(50, 'j1', this.j1);
        this.drawFichasJugador(920, 'j2', this.j2);
    }

    //Este metodo crea las fichas de cada jugador, a partir de una posicion pasada por parametro.
    //Recorre columnas y filas, instancia las fichas, y las va agregando a el arreglo fichas y en el context.
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

    //Invoca al meotodo dibujarTablero() de la clase Tablero 
    initJuego() {
        this.tablero.dibujarTablero();
    }

    //Este metodo prepara el juego una vez que el usuario dio click en "jugar"
    prepareJuego() {
        this.tablero.dibujarTablero();
        this.setFichas();
        this.marcarTurnoActual();
    }

    //Este metodo recorre el arreflo fichas y dibuja las fichas que contiene.
    setFichas() {
        for (var i = 0; i < this.fichas.length; i++) {
            this.fichas[i].dibujar();
        }
    }

    //Este metodo, a travez de innerHTML indica el turno del jugador.
    marcarTurnoActual() {
        if (this.turno === 1) {
            document.getElementById('turno').innerHTML = " Juega: JUGADOR 1"
        }
        else if (this.turno === 2) {
            document.getElementById('turno').innerHTML = "Juega: JUGADOR 2"
        }
    }

    //Este metodo busca la ficha clickeada, recorriendo todo el arreglo fichas.
    isClickedFicha(x, y) {
        for (var i = 0; i < this.fichas.length; i++) {
            var fichaTmp = this.fichas[i];
            if (fichaTmp.isClicked(x, y) && fichaTmp.getJugador() === this.turno 
            && fichaTmp.getEstado() !== 'inactiva' && !this.juegoFinalizado) {
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

    //Este metodo actualiza la posicion de la ficha y redibuja todo
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

    //Este metodo controla que se pueda seguir jugando.
    //Pregunta si hay un ganador, si se quedaron sin fichas o simplemente permite insertar la ficha.
    insertarFicha(x, y) {
        if (this.tablero.pudoInsertarFicha(x, y, this.fichaActual)) {
            this.cantidadFichas--;
            if (this.hayGanador()) {
                var mensajeGanador = document.getElementById('info-ganador');
                if (this.turno === 1)
                    mensajeGanador.innerHTML = 'Gano el JUGADOR 1';
                else
                    mensajeGanador.innerHTML = 'Gano el JUGADOR 2';
                mensajeGanador.classList.remove('oculto');
                this.juegoFinalizado = true;
            }
            else if (this.cantidadFichas === 0) {
                this.juegoFinalizado = true;
                var alerta = document.getElementById('info-empate');
                alerta.classList.remove('oculto');
            }
            else
                this.turno = (this.turno === 1) ? 2 : 1;
        }
        else {
            this.fichaActual.x = this.posInicialX;
            this.fichaActual.y = this.posInicialY;
            this.fichas.push(this.fichaActual);
        }
        this.resetFichaClickeada();
        this.prepareJuego();
    }

    //Este metodo llama a los metodos del tablero, para saber si se cumplio alguna de las posibilidades para
    //ganar. Por lo tanto, pregunta si hay un ganador.
    hayGanador() {
        var hayGanador = false;
        if (this.tablero.comprobarVertical() || this.tablero.comprobarHorizontal() ||
            this.tablero.comprobarHorizontal() || this.tablero.comprobarDiagonal())
            hayGanador = true;
        return hayGanador;
    }
}