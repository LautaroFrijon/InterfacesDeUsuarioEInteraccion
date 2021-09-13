"use strict"
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = '#FFFFFF';
ctx.fillRect(0, 0, 800, 800);
var imagen = document.getElementById('file').addEventListener('change', cargarImagen, false);

document.getElementById("binarizacion").addEventListener("click", function () {
  binarizacion();
});

document.getElementById("brillo").addEventListener("click", function () {
  brillo();
});

document.getElementById("sepia").addEventListener("click", function () {
  sepia();
});

document.getElementById("negativo").addEventListener("click", function () {
  negativo();
});
document.getElementById("saturacion").addEventListener("click", function () {
  saturacion()
});

document.getElementById("gris").addEventListener("click", function () {
  gris();
});

document.getElementById("blur").addEventListener("click", function () {
  blur();
})

function cargarImagen(e) {
  var reader = new FileReader();
  reader.onload = function (event) {
    var imagen1 = new Image();

    imagen1.onload = function () {
      dibujarImg(this);
    }
    imagen1.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
}

function dibujarImg(imagen) {

  ctx.drawImage(imagen, 0, 0, 800, 800);
  redimensionarImagen(imagen, canvas)

}

//Calculo el ratio, si es mayor a 1 la imagen es chica, y si es menor a uno es muy grande, 
//cuando es muy grande se multiplica la imagen por el ratio

//El metodo de redimensionar imagen lo vamos a hacer calculando el ratio de la misma
//y comparandolo si es mayor o menor a 1.
function redimensionarImagen(imagen, canvas) {
  if (imagen.width > canvas.width) {
    console.log("entra");

    imagen.width = imagen.width - (imagen.width - canvas.width);
  }
  if (imagen.height > canvas.height) {
    console.log("entra");
    imagen.height = imagen.height - (imagen.height - canvas.height);
  }
}

//variable brillo 

//Calculamos el promedio de los colores y si es mayor 255/2, se le pone 255 directamente,
//en caso contrario, se lo pone en 0.
function binarizacion() {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
      let index = (x + y * imageData.width) * 4; //agarro el índice de la matriz // covnieron en matriz
      //sacp promedio de los r g b
      let promedio = (imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
      if (promedio > (255 / 2)) {
        promedio = 255;
      } else {
        promedio = 0;
      }
      imageData.data[index + 0] = promedio;
      imageData.data[index + 1] = promedio;
      imageData.data[index + 2] = promedio;
      //coloco la imagen en el canvas
    }
  }
  ctx.putImageData(imageData, 0, 0);

}

//Este filtro lo hicimos intentando hacer el de binarizacion.
//Sacamos el promedio de los tres colores, pero en vez de fijarnos si es mas o menos chicos que
//255/2, directamente ponemos el promedio y nos da una escala de gris.
function gris() {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
      var index = (x + y * imageData.width) * 4; //agarro el índice de la matriz // covnieron en matriz
      //saco promedio de los r g b
      let promedio = (imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
      imageData.data[index + 0] = promedio;
      imageData.data[index + 1] = promedio;
      imageData.data[index + 2] = promedio;
      //coloco la imagen en el canvas
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

//En este filtro, lo que se hace es, hacer 
function negativo(imageData, x, y) {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
      var index = (x + y * imageData.width) * 4; //agarro el índice de la matriz // covnieron en matriz
      //saco promedio de los r g b
      imageData.data[index + 0] = 255 - imageData.data[index + 0];
      imageData.data[index + 1] = 255 - imageData.data[index + 1];
      imageData.data[index + 2] = 255 - imageData.data[index + 2];
    }
  }
  //coloco la imagen en el canvas
  ctx.putImageData(imageData, 0, 0);
}

// este filtro lo resolvimos aumentando el valor rgb en cada iteracion
// en todos por igual
function brillo() {
  var valor = 70;
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //parseInt(document.getElementById("brillo").value);
  //ctx.putImageData(bkp_img, 0, 0);
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
      //imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let index = (x + y * imageData.width) * 4; //agarro el índice de la matriz // covnieron en matriz
      imageData.data[index] = (imageData.data[index] + valor);
      imageData.data[index + 1] = (imageData.data[index + 1] + valor);
      imageData.data[index + 2] = (imageData.data[index + 2] + valor);
    }
  }
  ctx.putImageData(imageData, 0, 0);
};

function saturacion() {
  let valor = 70;
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //obtiene un facto de referencia para ir modificando la saturacion
  var factor = (259 * (valor + 255)) / (255 * (259 - valor));
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
      let index = (x + y * imageData.width) * 4; //agarro el índice de la matriz // covnieron en matriz
      //Cálculo del valor de cada píxel tras aplicar el factor anterior.
      imageData.data[index] = factor * (imageData.data[index] - 128) + 128;
      imageData.data[index + 1] = factor * (imageData.data[index + 1] - 128) + 128;
      imageData.data[index + 2] = factor * (imageData.data[index + 2] - 128) + 128;
    }
  }
  ctx.putImageData(imageData, 0, 0);
};


function sepia() {
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
      var index = (x + y * imageData.width) * 4;
      imageData.data[index] = (imageData.data[index] * .393) + (imageData.data[index + 1] * .769) + (imageData.data[index + 2] * .189);
      imageData.data[index + 1] = (imageData.data[index] * .349) + (imageData.data[index + 1] * .686) + (imageData.data[index + 2] * .168);
      imageData.data[index + 2] = (imageData.data[index] * .272) + (imageData.data[index + 1] * .534) + (imageData.data[index + 2] * .131);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function blur() {
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (var x = 0; x < canvas.width; x++) {
    for (var y = 0; y < canvas.height; y++) {
      let index = (x + y * imageData.width) * 4;
      imageData.data[index] = calcularPromedioNumerosAlrededor(imageData, index, x, y);
      imageData.data[index + 1] = calcularPromedioNumerosAlrededor(imageData, index, x, y);
      imageData.data[index + 2] = calcularPromedioNumerosAlrededor(imageData, index, x, y);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function calcularPromedioNumerosAlrededor(imageData, index, x, y) {
  let promedio;
  promedio = (imageData.data[x, y] + imageData.data[(x + 1), y] + imageData.data[(x - 1), y] + imageData.data[x, (y + 1)] + imageData.data[x, (y - 1)] + imageData.data[(x - 1), (y - 1)] + imageData.data[x + 1, y + 1] + imageData.data[(x - 1), (y + 1)] + imageData.data[(x + 1), (y - 1)]) / 9;
  return promedio;
}