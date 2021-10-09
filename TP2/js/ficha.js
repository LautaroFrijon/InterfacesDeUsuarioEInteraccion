class Ficha {

    constructor(x, y, color, jugador) {
        this.x = x;
        this.y = y;
        this.radio = 25;
        this.jugador = jugador;
        this.estado = '';
        this.imagen = new Image();
        this.getSrc(color)
    }


    getSrc(color) {
        if (color === 'j1')
            this.imagen.src = '/TP2/img/ficha.png';
        else if (color === 'j2')
            this.imagen.src = '/TP2/img/ficha.png';
        else if (color === 'ranuras')
            this.imagen.src = '/TP2/img/ficha.png';
    }

    getNombre() {
        return this.jugador.getNombre();
    }

    getEstado() {
        return this.estado;
    }

    setContext(ctx) {
        this.ctx = ctx;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setColor(color) {
        this.color = color;
    }

    setEstado(estado) {
        this.estado = estado;
    }
    dibujar() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.drawImage(this.imagen, this.x - this.radio - 6, this.y - this.radio - 6);
    }

}