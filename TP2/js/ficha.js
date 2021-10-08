class Ficha{

    constructor(x, y, color, jugador){
        this.x = x;
        this.y = y;
        this.radio = 25;
        this.jugador = jugador;
        this.estado = '';
        this.imagen = new Image();
        this.getSrc(color)
    }

    getNombre() {
        return this.jugador.getNombre();
    }

    getEstado() {
        return this.estado;
    }

    setContext(ctx){
        this.ctx = ctx;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setColor(color){
        this.color = color;
    }

    setEstado(estado) {
        this.estado = estado;
    }

}