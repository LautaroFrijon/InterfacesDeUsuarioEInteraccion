document.addEventListener("DOMContentLoaded", function () {
    let person = new Personaje(2, 3, false, false);
    let e1 = new Escenario(1, 2, Personaje);
    let obs = new obstaculo(1, 1, 1, 1);
    let personaje = document.querySelector(".box-personaje");


    document.addEventListener("keydown", function (e) {
        if (person.jump(e)) {
            personaje.classList.add("box-personaje-jump");
            personaje.style.bottom = 120 + "px";
            person.setY(120);

            console.log('entra');



        };


        setTimeout(function (e) {
            if (person.dejarSalto()) {
                personaje.classList.remove("box-personaje-jump")
                let pos = person.getY() - 100;
                console.log(pos);
                personaje.style.bottom = pos + "px";

            }
        }, 1000);
    });



    setTimeout(function (e) {
        obs.CrearObstaculo();
        console.log('entra a crear el oibs')

    }, 1000);








    function walk() {
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