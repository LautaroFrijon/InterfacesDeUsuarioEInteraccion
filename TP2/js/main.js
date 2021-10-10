    var canvas = document.getElementById('tablero');
    var iniciarJuego = document.getElementById('botonComenzar');
    var retry = document.getElementById('botonRetry');

    var juego = new Juego(canvas);

    //Envento del boton iniciar que inicia el juego
    iniciarJuego.onclick = function () {
        juego = new Juego(canvas);
        juego.prepareJuego();
        initEvents();
        document.getElementById('info-ganador').classList.add('oculto');
        document.getElementById('info-empate').classList.add('oculto');
    }

    
    retry.onclick = function () {
        juego = new Juego(canvas);
        juego.prepareJuego();
        initEvents();
        document.getElementById('info-ganador').classList.add('oculto');
        document.getElementById('info-empate').classList.add('oculto');
    }

    //Este metodo contiene los tres event que permiten el movimient de las fichas.
    function initEvents() {
        canvas.onmousedown = function (e) {
            var x = e.layerX - e.currentTarget.offsetLeft;
            var y = e.layerY - e.currentTarget.offsetTop;
            juego.isClickedFicha(x, y);
        }

        canvas.onmousemove = function (e) {
            var x = e.layerX - e.currentTarget.offsetLeft;
            var y = e.layerY - e.currentTarget.offsetTop;
            if (juego.hayFichaClickeada())
                juego.moveFicha(x, y);
        }

        canvas.onmouseup = function (e) {
            var x = e.layerX - e.currentTarget.offsetLeft;
            var y = e.layerY - e.currentTarget.offsetTop;
            if (juego.hayFichaClickeada()) {
                juego.insertarFicha(x, y);
            }
        };
    }
