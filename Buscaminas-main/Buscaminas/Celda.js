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

}