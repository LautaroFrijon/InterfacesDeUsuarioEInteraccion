var imagen_ejemplo = new Image();
 var ctx = document.getElementById("canvas").getContext("2d");
   document.getElementById('file').onchange= function(e){
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = function (){
      imagen_ejemplo.src= reader.result;
      imagen_ejemplo.onload = function(){
      dibujarImg(imagen_ejemplo);
      var imageData = ctx.getImageData(0, 0, imagen_ejemplo.width, imagen_ejemplo.height);
      ctx.putImageData(imageData,0,0);

      //recorro ancho y alto de la imagen (iamge data la matriz y voy pintando perro)
     /*for (var eje_x = 0; eje_x < imageData.width; eje_x ++) {
       for (var eje_y = 0; eje_y < imageData.height; eje_y ++) {
         setPixel(imageData,eje_x,eje_y);
        ; 
   
    }
   
   }*/
   
    }
  }
}
 /*imagen.onload = function(){
   dibujarImg(this);
   var imageData = ctx.getImageData(0, 0, this.width, this.height);
   //recorro ancho y alto de la imagen (iamge data la matriz y voy pintando perro)
  for (var eje_x = 0; eje_x < imageData.width; eje_x ++) {
    for (var eje_y = 0; eje_y < imageData.height; eje_y ++) {
      setPixel(imageData,eje_x,eje_y);
     ; 

 }

}

 }
*/
 function dibujarImg(imagen){
   ctx.drawImage(imagen,0,0,500,450);
 }




  function setPixel(imageData,x,y){
  
  index=(x+y*imageData.width)*4//agarro el índice de la matriz // covnieron en matriz
  //sacp promedio de los r g b
  let promedio= (imageData.data[index+0] + imageData.data[index+1] + imageData.data[index+2]) / 3;
   imageData.data[index+0] = promedio;
  imageData.data[index+1] = promedio;
  imageData.data[index+2] = promedio;
  //coloco la imagen en el canvas
  ctx.putImageData(imageData,0,0);

  }
