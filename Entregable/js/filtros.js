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
          brillo(imageData, x, y)
        }
      }
    };
  };
};
function dibujarImg(imagen) {
  ctx.drawImage(imagen, 0, 0, 600, 600);
}


function redimensionarImagen(imagen, canvas) {
  //cuando la imagen es mas chica q el canvas
  if (imagen.width < canvas.width && imagen.height < canvas.height) {
    imagen.width = imagen.width - (imagen.width - canvas.width);
    imagen.height = imagen.height - (imagen.height - canvas.height);
  }
  if (imagen.width > canvas.width && imagen.height > canvas.height) {
    imagen.width = imagen_ejemplo.width + (imagen_ejemplo.width - canvas.width);
    imagen.height = imagen_ejemplo.height + (imagen_ejemplo.height - canvas.height);
  }
}

//calcula el tono de gris y si es mayor que 255/2 pones 255, si no 0 

//variable brillo 

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

function negativo(imageData, x, y) {
  index = (x + y * imageData.width) * 4; //agarro el índice de la matriz // covnieron en matriz
  //sacp promedio de los r g b
  imageData.data[index + 0] = 255 - imageData.data[index + 0];
  imageData.data[index + 1] = 255 - imageData.data[index + 1];
  imageData.data[index + 2] = 255 - imageData.data[index + 2];
  //coloco la imagen en el canvas
  ctx.putImageData(imageData, 0, 0);
}


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
