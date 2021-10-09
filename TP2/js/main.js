
var iniciarjuego = document.getElementById('botonComenzar');
var canvas = document.getElementById('canvas');
let juego = new Juego(canvas);


iniciarjuego.addEventListener("click", function () {

    juego = new Juego(canvas);
    juego.prepareJuego();

})