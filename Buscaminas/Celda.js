class Celda {
    posicionX;
    posicionY;
    hasBomba = false;
    hasBandera = false;
    esCasillaInicial;
    isDesvelada = false;
    numero = 0;
    initialClick = false;
    constructor(posicionX, posicionY) {
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.esCasillaInicial = true;

    }
    getN() { //Devuelve el numero de la celda, por lo que he visto cuando se una un objeto como parametro de un metodo, no puedes hacer celda.numero
        return this.numero;
    }

}