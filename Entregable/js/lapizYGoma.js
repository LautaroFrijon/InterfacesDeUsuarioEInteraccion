let imagen_ejemplo = new Image();
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

let color = "balck";
let dibujando = false;
var grosor = 1;
let x = -1;
let y = -1;

canvas.addEventListener("mousedown", function (dibujando) {
    dibujando = true;
})

canvas.addEventListener("mouseup", function (dibujando) {
    dibujando = false;
    x = -1;
    y = -1;
})

canvas.addEventListener("mousemove", function () {

})