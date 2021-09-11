var imagen_ejemplo = new Image();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
document.getElementById("file").onchange = function (e) {
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = function () {
    imagen_ejemplo.src = reader.result;
    redimensionarImagen(imagen_ejemplo, canvas);
    imagen_ejemplo.onload = function () {
      dibujarImg(imagen_ejemplo);
      var imageData = ctx.getImageData(0, 0, imagen_ejemplo.width, imagen_ejemplo.height);

      for (var x = 0; x < canvas.width; x++) {
        for (var y = 0; y < canvas.height; y++) {
          //gris(imageData, x, y);
          //negativo(imageData, x, y);
          brillo(imageData, x, y);
        }
      }
    };
  };
};

function dibujarImg(imagen) {
  ctx.drawImage(imagen, 0, 0, 600, 600);
}

//Calculo el ratio, si es mayor a 1 la imagen es chica, y si es menor a uno es muy grande, 
//cuando es muy grande se multiplica la imagen por el ratio

//El metodo de redimensionar imagen lo vamos a hacer calculando el ratio de la misma
//y comparandolo si es mayor o menor a 1.
function redimensionarImagen(imagen, canvas) {
  if (imagen.width > canvas.width) {
    imagen.width = imagen.width - (imagen.width - canvas.width);
    imagen.height = imagen.height - (imagen.height - canvas.height);
  }
  else if (imagen.height < canvas.height) {
    imagen.height = imagen.height + (imagen.height - canvas.height);
    imagen.width = imagen.width + (imagen.width - canvas.width);
  }
}

//variable brillo 

//Calculamos el promedio de los colores y si es mayor 255/2, se le pone 255 directamente,
//en caso contrario, se lo pone en 0.
function binarizacion(imageData, x, y) {
  index = (x + y * imageData.width) * 4; //agarro el índice de la matriz // covnieron en matriz
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
  ctx.putImageData(imageData, 0, 0);
}

//Este filtro lo hicimos intentando hacer el de binarizacion.
//Sacamos el promedio de los tres colores, pero en vez de fijarnos si es mas o menos chicos que
//255/2, directamente ponemos el promedio y nos da una escala de gris.
function gris(imageData, x, y) {
  index = (x + y * imageData.width) * 4; //agarro el índice de la matriz // covnieron en matriz
  //sacp promedio de los r g b
  let promedio = (imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
  imageData.data[index + 0] = promedio;
  imageData.data[index + 1] = promedio;
  imageData.data[index + 2] = promedio;
  //coloco la imagen en el canvas
  ctx.putImageData(imageData, 0, 0);
}

//En este filtro, lo que se hace es, hacer 
function negativo(imageData, x, y) {
  index = (x + y * imageData.width) * 4; //agarro el índice de la matriz // covnieron en matriz
  //saco promedio de los r g b
  imageData.data[index + 0] = 255 - imageData.data[index + 0];
  imageData.data[index + 1] = 255 - imageData.data[index + 1];
  imageData.data[index + 2] = 255 - imageData.data[index + 2];
  //coloco la imagen en el canvas
  ctx.putImageData(imageData, 0, 0);
}

// este filtro lo resolvimos aumentando el valor rgb en cada iteracion
// en todos por igual
function brillo(imageData, x, y) {
  var valor = 70;
  //parseInt(document.getElementById("brillo").value);
  //ctx.putImageData(bkp_img, 0, 0);
  //imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  index = (x + y * imageData.width) * 4; //agarro el índice de la matriz // covnieron en matriz
  imageData.data[index] = (imageData.data[index] + valor);
  imageData.data[index + 1] = (imageData.data[index + 1] + valor);
  imageData.data[index + 2] = (imageData.data[index + 2] + valor);
  ctx.putImageData(imageData, 0, 0);
};

function sepia(imageData, x, y) {
  let index = (x + y * imageData.width) * 4;
  imageData.data[index + 0] = (imageData.data[index + 0] * .393) + (imageData.data[index + 1] * .769) + (imageData.data[index + 2] * .189);
  imageData.data[index + 1] = (imageData.data[index + 0] * .349) + (imageData.data[index + 1] * .686) + (imageData.data[index + 2] * .168);
  imageData.data[index + 2] = (imageData.data[index + 0] * .272) + (imageData.data[index + 1] * .534) + (imageData.data[index + 2] * .131);
  ctx.putImageData(imageData, 0, 0);
}