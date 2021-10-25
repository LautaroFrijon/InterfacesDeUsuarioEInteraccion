document.addEventListener("DOMContentLoaded", function(){
    let person = new Personaje(2, 3,false, false);
     let  e1= new Escenario(1, 2, Personaje);
    let personaje = document.querySelector(".box-personaje");


    document.addEventListener("keydown", function(e){
       if (person.jump(e)){
        personaje.classList.add("box-personaje-jump");
        console.log('entra');

       

       };

       
    setTimeout(function(e){
        if (person.dejarSalto()){
            console.log('entra en djear');
         personaje.classList.remove("box-personaje-jump")}},1000);
    });

   


    

    function walk(){
        personaje.classList.add("box-personaje-walk");
    }

    document.addEventListener("keyup", walk);

    function Init() {
        time = new Date();
        Start();
        Loop();
    }

    function Loop() {
        deltaTime = (new Date() - time) / 1000;
        time = new Date();
        Update();
        requestAnimationFrame(Loop);
    }

});