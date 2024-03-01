
class Tablero {
    altura;
    anchura;
    tablero;
    minas;
    constructor(altura, anchura, minas) {
        this.altura = altura;
        this.anchura = anchura;
        this.tablero = [];
        this.minas = minas;
        this.generarTablero(altura, anchura);
        this.colocarBombas(minas);
        this.colocarNumeros();

    }

    generarTablero(altura, anchura) {
        for (let i = 0; i < altura; i++) {
            this.tablero[i] = [];
            for (let j = 0; j < anchura; j++) {
                let celda = new Celda(i, j);
                this.tablero[i][j] = celda;
            }
        }
    }
    colocarBombas(minas) {
        for (let i = 0; i < minas; i++) {
            let x = Math.floor(Math.random() * this.altura);
            let y = Math.floor(Math.random() * this.anchura);
            if (this.tablero[x][y].hasBomba === true) {
                i--;
            } else {
                this.tablero[x][y].hasBomba = true;
            }
        }
    }

    colocarNumeros() { 
        for (let i = 0; i < this.altura; i++) {
            for (let j = 0; j < this.anchura; j++) {
                let celda = this.tablero[i][j];
                if (celda.hasBomba) {
                    if (i - 1 >= 0 && j - 1 >= 0) {
                        this.tablero[i - 1][j - 1].numero++;
                    }
                    if (i-1 >= 0 ) {
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
                
                }
            }
        }
    }
    
}
class Celda {
    posicionX;
    posicionY;
    hasBomba = false;
    esCasillaInicial;
    isDesvelada = false;
    numero = 0;
    constructor(posicionX, posicionY) {
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        
    }
    
}

class PlayerInteraction {

    tableroMinas

    constructor(altura, anchura, minas) {
        this.tableroMinas = new Tablero(altura, anchura, minas);

    }
    checkTablero() {
        
        if (this.tableroMinas.altura < 8 || this.tableroMinas.anchura < 8 || this.tableroMinas.minas > (this.tableroMinas.altura * this.tableroMinas.anchura) * 0.33 || this.tableroMinas.altura > 24 || this.tableroMinas.anchura > 32 || this.tableroMinas.minas < 1) {
            alert('La altura debe estar entre 8 y 24, la anchura entre 8 y 32 y el número de minas debe ser menor al 33% del total de casillas y mayor a 0');
        }
        else {
            let startButton = document.getElementById('startButton');
            startButton.disabled = true;
            let container = document.getElementById('container');

            for (let i = 0; i < this.tableroMinas.altura; i++) {
                let fila = document.createElement('div');
                fila.classList.add('fila');
                for (let j = 0; j < this.tableroMinas.anchura; j++) {
                    let casilla = this.tableroMinas.tablero[i][j];     
                    casilla = document.createElement('div');
                    if (this.tableroMinas.tablero[i][j].hasBomba === false) {
                        casilla.textContent = this.tableroMinas.tablero[i][j].numero;
                    }
                    
                    casilla.classList.add('celda');
                    casilla.classList.add('hidden');
                    if (this.tableroMinas.tablero[i][j].hasBomba) {
                        casilla.classList.add('bomba');
                    }
                    casilla.onclick = () => {
                        if (this.tableroMinas.tablero[i][j].hasBomba && casilla.classList.contains('bandera') === false && casilla.classList.contains('visible') === false) {
                            this.desvelarTablero(container);
                        }
                        else if (casilla.classList.contains('bandera') === false && casilla.classList.contains('visible') === false){
                            casilla.classList.remove('hidden');
                            casilla.classList.add('visible');
                            this.tableroMinas.tablero[i][j].isDesvelada = true; 
                        }
                        
                
                    }
                    casilla.onauxclick = () => casilla.classList.toggle('bandera');
                    fila.appendChild(casilla); 
                }
                container.appendChild(fila);
            }
        }

    }
    desvelarTablero(container) {
        alert('Has perdido');
        for (let i = 0; i < this.tableroMinas.altura; i++) {
            let fila = container.children[i];
            for (let j = 0; j < this.tableroMinas.anchura; j++) {

                fila.children[j].classList.remove('hidden');
                fila.children[j].classList.add('visible');

            }
        }
    }


}

function init() {
    let altura = document.getElementById('Alto').value;
    let anchura = document.getElementById('Ancho').value;
    let minas = document.getElementById('Minas').value;
    juego = new PlayerInteraction(altura, anchura, minas);
    juego.checkTablero();
}




