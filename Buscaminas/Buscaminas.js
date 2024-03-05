
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
        this.colocarBombas(minas); //Coloca las minas en el tablero

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
    colocarBombas(minas) {
        for (let i = 0; i < minas; i++) {
            let x = Math.floor(Math.random() * this.altura); // Se coloca la bomba en una posicion aleatoria donde no haya bomba
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
                celda.esCasillaInicial = false; //Para que el click inicial solo se ejecute 1 vez
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
        this.esCasillaInicial = true;

    }
    getN() { //Devuelve el numero de la celda, por lo que he visto cuando se una un objeto como parametro de un metodo, no puedes hacer celda.numero
        return this.numero;
    }

}

class PlayerInteraction {

    tableroMinas; //Aqui se guardara el tablero

    constructor(altura, anchura, minas) {
        this.tableroMinas = new Tablero(altura, anchura, minas);

    }
    checkTablero() { //Comprueba que el tablero sea valido y genera el tablero en el DOM

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
                    casilla.classList.add('celda');
                    casilla.classList.add('hidden');
                    if (this.tableroMinas.tablero[i][j].hasBomba) {
                        casilla.classList.add('bomba');
                    }
                    casilla.onclick = () => {
                        if (this.tableroMinas.tablero[i][j].esCasillaInicial && this.tableroMinas.tablero[i][j].hasBomba === true) {
                            this.tableroMinas.tablero[i][j].hasBomba = false;
                            casilla.classList.remove('bomba');
                            this.tableroMinas.minas--;

                            this.tableroMinas.colocarNumeros();
                            for (let i = 0; i < this.tableroMinas.altura; i++) {
                                for (let j = 0; j < this.tableroMinas.anchura; j++) {
                                    if (this.tableroMinas.tablero[i][j].hasBomba === false) {
                                        let casilla = container.children[i].children[j];
                                        casilla.textContent = this.tableroMinas.tablero[i][j].numero;

                                    }
                                }

                            }
                        }
                        else if (this.tableroMinas.tablero[i][j].esCasillaInicial) {
                            this.tableroMinas.colocarNumeros();
                            for (let i = 0; i < this.tableroMinas.altura; i++) {
                                for (let j = 0; j < this.tableroMinas.anchura; j++) {
                                    if (this.tableroMinas.tablero[i][j].hasBomba === false) {
                                        let casilla = container.children[i].children[j];
                                        casilla.textContent = this.tableroMinas.tablero[i][j].numero;
                                    }
                                }

                            }
                        }
                        if (this.tableroMinas.tablero[i][j].hasBomba && casilla.classList.contains('bandera') === false && casilla.classList.contains('visible') === false) {
                            this.desvelarTablero(container);
                        }
                        else if (casilla.classList.contains('bandera') === false && casilla.classList.contains('visible') === false) {
                            this.tableroMinas.tablero[i][j].isDesvelada = true;
                            if (this.tableroMinas.tablero[i][j].getN() === 0 && casilla.classList.contains('hidden')) {
                                this.desvelarCerosConectados(container, this.tableroMinas.tablero, this.tableroMinas.tablero[i][j].posicionX, this.tableroMinas.tablero[i][j].posicionY);
                            }
                            else {
                                casilla.classList.remove('hidden'); //Desvela la casilla
                                casilla.classList.add('visible');
                            }

                            Tablero.casillasDesveladas++; //Se suma 1 a las casillas desveladas
                            if (Tablero.casillasDesveladas >= (this.tableroMinas.altura * this.tableroMinas.anchura) - this.tableroMinas.minas) {
                                alert('Has ganado'); //Si todas las casillas menos las minas estan desveladas, has ganado
                                this.desactivarTablero(container);
                            }
                        }
                    }
                    casilla.onauxclick = () => casilla.classList.toggle('bandera');
                    fila.appendChild(casilla);
                }
                container.appendChild(fila);
            }
        }
    }
    desvelarTablero(container) { //Revela las bombas si fallas
        alert('Has perdido');
        for (let i = 0; i < this.tableroMinas.altura; i++) {
            let fila = container.children[i];
            for (let j = 0; j < this.tableroMinas.anchura; j++) {
                if (this.tableroMinas.tablero[i][j].hasBomba) { 
                    fila.children[j].classList.remove('hidden'); //Desvela la casilla
                    fila.children[j].classList.add('visible');
                }
                
            }
        }
        this.desactivarTablero(container);
    }
    desactivarTablero(container) { //Hace que no se pueda clickar más en el tablero
        for (let i = 0; i < this.tableroMinas.altura; i++) {
            let fila = container.children[i];
            for (let j = 0; j < this.tableroMinas.anchura; j++) {
                fila.children[j].onclick = null;
                
            }
        }
    }
    desvelarCerosConectados(tableroDom, tableroObject, X, Y) { //Desvela los 0 conectados entre si al clickar uno de ellos
        tableroDom.children[Y].children[X].classList.remove('hidden');
        tableroDom.children[Y].children[X].classList.add('visible');
        tableroObject[Y][X].isDesvelada = true;
        if (tableroObject[Y][X].getN() == 0 && X - 1 >= 0 && tableroObject[Y][X - 1].isDesvelada === false) {

            Tablero.casillasDesveladas++; //Se suma 1 a las casillas desveladas
            this.desvelarCerosConectados(tableroDom, tableroObject, X - 1, Y); //Es recursivo, por lo que se llama a si mismo hasta que no haya mas 0 conectados

        }
        if (tableroObject[Y][X].getN() == 0 && X + 1 < this.tableroMinas.anchura && tableroObject[Y][X + 1].isDesvelada === false) {

            Tablero.casillasDesveladas++;
            this.desvelarCerosConectados(tableroDom, tableroObject, X + 1, Y);

        }
        if (tableroObject[Y][X].getN() == 0 && Y + 1 < this.tableroMinas.altura && tableroObject[Y + 1][X].isDesvelada === false) {

            Tablero.casillasDesveladas++;
            this.desvelarCerosConectados(tableroDom, tableroObject, X, Y + 1);

        }
        if (tableroObject[Y][X].getN() == 0 && Y - 1 >= 0 && tableroObject[Y - 1][X].isDesvelada === false) {

            Tablero.casillasDesveladas++;
            this.desvelarCerosConectados(tableroDom, tableroObject, X, Y - 1);

        }
        //Mira solo las 4 casillas adyacentes, no las diagonales, para no desvelar casillas que no deberian ser desveladas





    }
}

function init() { // Inicializa el juego
    let altura = document.getElementById('Alto').value;
    let anchura = document.getElementById('Ancho').value;
    let minas = document.getElementById('Minas').value;
    juego = new PlayerInteraction(altura, anchura, minas);
    juego.checkTablero();
}




