let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

let color = 'black';
var dibujando = false;
let grosor = 1;
let x = -1;
let y = -1;

canvas.addEventListener("mouseup", function (x, y) {
    dibujando = false;
    x = -1;
    y = -1;
});

canvas.addEventListener("mousedown", function () {
    dibujando = true;
});

canvas.addEventListener("mousemove", function (x, y, e) {
    let x2 = e.layerX - 15;
    let y2 = e.layerY;
    if (dibujando) {
        ctx.lineCap = "round";
        ctx.lineWidth = grosor;
        ctx.strokeStyle = color;
        ctx.beginPath();
        //ctx.moveTo(x,y);
        if (x != -1 && y != -1) {
            ctx.moveTo(x, y);
        }
        ctx.lineTo(x, y);
        ctx.stroke();
        x = x2;
        y = y2;
    }
});

