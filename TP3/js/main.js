let personaje = document.querySelector("#box-personaje");

personaje.addEventListener("keydown", (e) =>{
    if(e.keyCode === 32){
        personaje.style.animationName = "jump";
    }
});


personaje.addEventListener("keyup", (e) =>{
    if(e.keyCode === 32){
        personaje.style.animationName = "walk";
    }
})