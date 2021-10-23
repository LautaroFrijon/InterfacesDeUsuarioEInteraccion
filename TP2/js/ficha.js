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

    //Este metodo Diferencia entre las fichas del jugador 1, las del 2 y las que vas en el tablero.
    getSrc(color) {
        if (color === 'j1')
            this.imagen.src = '/TP2/img/ficha1.png';
        else if (color === 'j2')
            this.imagen.src = '/TP2/img/ficha2.png';
        else if (color === 'ranuras')
            this.imagen.src = '/TP2/img/negro2.png';
    }

    getJugador() {
        if (this.jugador === 0)
            return this.jugador;
        else
            return this.jugador.getNroJugador();
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

    //Este metodo indica si la ficha esta clickeada no.
    isClicked(x, y) {
        var xLayer = x - this.x;
        var yLayer = y - this.y;
        //Esta cuenta calcula si nos encontramos dentro de la ficha.
        return Math.sqrt(xLayer * xLayer + yLayer * yLayer) < this.radio;
    }

    //Este metodo dibujar, dibuja un circulo con los parametros correspondientes, dandole forma
    //a la ficha. Luego dibuja la imagen sobr la ficha.
    dibujar() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.drawImage(this.imagen, this.x - this.radio - 6, this.y - this.radio - 6);
    }
}
