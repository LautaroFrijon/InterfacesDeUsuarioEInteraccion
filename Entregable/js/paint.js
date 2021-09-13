
let imagen_ejemplo = new Image();
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = '#FFFFFF';
ctx.fillRect(0, 0, canvas.width, canvas.height);


//ESTA FUNCION ME DEVUELVE
//A DONDE ESTA EL CANVAS 
//CON RESPECTO A LA PANTALLA
let rect = canvas.getBoundingClientRect();
let x = 0;
let y = 0;
//saber cuando esta dibujando
let dibujando = false;
let color = 'black';
grosor = 1;

function defcolor(c) {
    color = c;
}

function defgrosor(g) {
    grosor = g;
}


document.getElementById("goma").addEventListener("click", function () {
    color = 'white';
})

//cuando baja y empieza a dibujar
canvas.addEventListener('mousedown', function (e) {
    //ressto el clientex - rect parea saber donde esta el canvas dentro de la pantalla
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    dibujando = true;
})


canvas.addEventListener('mousemove', function (e) {
    if (dibujando === true) {
        //le paso el punto inicial donde hice click la primer vez(x,y)
        //y los parametros sigueinte vuelvo a calcular donde estoy en este momento
        dibujar(x, y, e.clientX - rect.left, e.clientY - rect.top)
        //actualizo x e y con el punto donde me encuentro
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }

})

//suelta el click
canvas.addEventListener('mouseup', function (e) {
    if (dibujando == true) {
        //dibujo la linea
        dibujar(x, y, e.clientX - rect.left, e.clientY - rect.top);
        //reseto valores
        x = 0;
        y = 0;
        dibujando = false;


    }
})

function dibujar(x1, y1, x2, y2) {
    //indico nueva ruta
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.moveTo(x1, y1);
    //crea la linea desde del ultimo punto es decir  (x1,y1) a (x2,y2)
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();


}

function borrar() {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = grosor;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}


document.getElementById('clearCanvas').addEventListener("click", function () {
    ctx.fillStyle = '#F8F8FF'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})
