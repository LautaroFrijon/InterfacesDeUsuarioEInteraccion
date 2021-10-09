
var iniciarjuego = document.getElementById('botonComenzar');
var canvas = document.getElementById('canvas');
let juego = new Juego(canvas);


iniciarjuego.addEventListener("click", function () {

    juego = new Juego(canvas);
    juego.prepareJuego();
    initEvents();

});

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
