
class Tablero {
    altura;
    anchura;
    tablero; //array donde se guardaran las celdas
    minas;
    static casillasDesveladas = 0; //Como solo hay un tablero, se puede hacer static

    constructor(altura, anchura, minas) {
        this.altura = altura;
        this.anchura = anchura;
        this.tablero = []; //array donde se guardaran las celdas
        this.minas = minas;
        this.generarTablero(altura, anchura); //Genera el tablero
    }

    generarTablero(altura, anchura) {
        for (let i = 0; i < altura; i++) {
            this.tablero[i] = [];
            for (let j = 0; j < anchura; j++) {
                let celda = new Celda(j, i);
                this.tablero[i][j] = celda;
            }
        }
    }
    accionCasilla(y, x, Event) {
        let celda = this.tablero[y][x];

        if (Event.button === 2) { //Si se hace click izquierdo pone o quita la bandera
            if (celda.hasBandera === false && celda.isDesvelada === false) {
                celda.hasBandera = true;
            } else if (celda.hasBandera === true && celda.isDesvelada === false) {
                celda.hasBandera = false;
            }
        }
        if (Event.button === 0) {
            if (celda.hasBandera === false) {
                if (celda.esCasillaInicial){
                    celda.initialClick = true;
                    this.colocarBombas(this.minas, y, x);
                    this.colocarNumeros();
                }
                if (celda.isDesvelada === false) {
                    if (celda.hasBomba === true) {
                        this.revelarBombas();
                    }
                    else {
                        celda.isDesvelada = true;
                        if (celda.numero === 0) {
                            this.revelarZeros(y,x);
                        }
                    }
                }
                
            }
        }

    }
    colocarBombas(minas, y , x) { //Modificando lo que se suma y resta a X i Y se puede cambiar el rango de celdas que se desvelan al principio
        for (let Y = y - 1; Y <= y + 1; Y++) {
            
            for (let X = x - 2; X <= x + 2; X++) {
                if (Y >= 0 && Y < this.altura && X >= 0 && X < this.anchura) {
                    this.tablero[Y][X].initialClick = true;
                    this.revelarZeros(Y,x);
                }
            }
        }
        for (let i = 0; i < minas; i++) {
            let x = Math.floor(Math.random() * this.altura); // Se coloca la bomba en una posicion aleatoria donde no haya bomba y no sea posicion inicial
            let y = Math.floor(Math.random() * this.anchura);
            if (this.tablero[x][y].hasBomba === true || this.tablero[x][y].initialClick === true) {
                i--;
            } 
            else {
                this.tablero[x][y].hasBomba = true;
            }
        }
    }
    revelarBombas() {
        for (let i = 0; i < this.altura; i++) {
            for (let j = 0; j < this.anchura; j++) {
                let celda = this.tablero[i][j];
                if (celda.hasBomba === true) {
                    celda.isDesvelada = true;
                }
            }
        }
        
    }
    colocarNumeros() {
        for (let i = 0; i < this.altura; i++) {
            for (let j = 0; j < this.anchura; j++) {
                let celda = this.tablero[i][j];
                celda.esCasillaInicial = false; //Para que el click inicial, con lo que se colocan los numeros, solo se ejecute 1 vez
                if (celda.hasBomba) { //Si la celda tiene bomba, se suma 1 a las celdas adyacentes y se comprueba que no se salga del tablero
                    if (i - 1 >= 0 && j - 1 >= 0) {
                        this.tablero[i - 1][j - 1].numero++;
                    }
                    if (i - 1 >= 0) {
                        this.tablero[i - 1][j].numero++;
                    }
                    if (i - 1 >= 0 && j + 1 < this.anchura) {
                        this.tablero[i - 1][j + 1].numero++;
                    }
                    if (j - 1 >= 0) {
                        this.tablero[i][j - 1].numero++;
                    }
                    if (j + 1 < this.anchura) {
                        this.tablero[i][j + 1].numero++;
                    }
                    if (i + 1 < this.altura && j - 1 >= 0) {
                        this.tablero[i + 1][j - 1].numero++;
                    }
                    if (i + 1 < this.altura) {
                        this.tablero[i + 1][j].numero++;
                    }
                    if (i + 1 < this.altura && j + 1 < this.anchura) {
                        this.tablero[i + 1][j + 1].numero++;
                    }
                    // No encontré una manera más eficiente de hacerlo que con 8 if
                }
            }
        }
    }
    revelarZeros(y,x) {
        for (let Y = y - 1; Y <= y + 1; Y++) {
            for (let X = x - 1; X <= x + 1; X++) {
                if (Y >= 0 && Y < this.altura && X >= 0 && X < this.anchura) {
                    let celda = this.tablero[Y][X];
                    if (celda.isDesvelada === false) {
                        celda.isDesvelada = true;
                        if (celda.numero === 0) {
                            this.revelarZeros(Y,X);
                        }
                    }
                }
            }
        }
    }
}






