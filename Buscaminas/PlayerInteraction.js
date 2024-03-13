class PlayerInteraction {

    tableroMinas; //Aqui se guardara el tablero
    
    constructor(altura, anchura, minas) {
        this.tableroMinas = new Tablero(altura, anchura, minas);

    }
    checkTablero() { //Comprueba que el tablero sea valido y genera el tablero en el DOM

        if (this.tableroMinas.altura < 8 || this.tableroMinas.anchura < 8 || this.tableroMinas.minas > (this.tableroMinas.altura * this.tableroMinas.anchura) * 0.33 || this.tableroMinas.altura > 24 || this.tableroMinas.anchura > 32 || this.tableroMinas.minas < 1) {
            alert('La altura debe estar entre 8 y 24, la anchura entre 8 y 32 y el número de minas debe ser menor al 33% del total de casillas y mayor a 0');
            //Si el tablero no es valido, se muestra un mensaje de error.
        }
        else {
            let startButton = document.getElementById('startButton');
            startButton.disabled = true;
            let minasButton = document.getElementById('Minas');
            minasButton.disabled = true;
            let anchuraButton = document.getElementById('Ancho');
            anchuraButton.disabled = true;
            let alturaButton = document.getElementById('Alto');
            alturaButton.disabled = true;
            let container = document.getElementById('container');
            let buscaminasBorder = document.getElementById('buscaMinas');
            buscaminasBorder.style.display = 'flex';
            container.style.display = 'block';
            //Coge los valores de los inputs y have el contenedor del tablero visible.
            
            for (let i = 0; i < this.tableroMinas.altura; i++) {
                let fila = document.createElement('div');
                fila.classList.add('fila');
                for (let j = 0; j < this.tableroMinas.anchura; j++) {
                    let casilla = this.tableroMinas.tablero[i][j];
                    casilla = document.createElement('div');
                    casilla.classList.add('celda');
                    casilla.classList.add('hidden'); //Se crea el html de las celdas y sus atributos
                    casilla.addEventListener('contextmenu', event => event.preventDefault());
                    casilla.onclick = () => { //Se le asigna un evento a cada celda
                        if (this.tableroMinas.tablero[i][j].esCasillaInicial && casilla.classList.contains('bandera') === false) {
                            //Codigo que solo se ejecuta la primera vez que se hace click en el tablero
                            this.tableroMinas.tablero[i][j].initialClick = true;
                            this.tableroMinas.colocarBombas(this.tableroMinas.minas, i, j);
                            this.tableroMinas.colocarNumeros();

                            for (let i = 0; i < this.tableroMinas.altura; i++) {
                                for (let j = 0; j < this.tableroMinas.anchura; j++) {
                                    if (this.tableroMinas.tablero[i][j].hasBomba === false && this.tableroMinas.tablero[i][j].numero > 0 ) {
                                        let casilla = container.children[i].children[j];
                                        casilla.textContent = this.tableroMinas.tablero[i][j].numero;
                                        //Pone el numero a las casillas que no sean 0 y que no contengan una bomba.
                                    }
                                    if (this.tableroMinas.tablero[i][j].isDesvelada) {
                                        let casilla = container.children[i].children[j];
                                        casilla.classList.remove('hidden');
                                        casilla.classList.add('visible');
                                        //Desvela las casillas inicialmente desveladas
                                    }
                                }

                            }
                        }
                        //Si clickas en una bomba, se desvelan todas las bombas y se desactiva el tablero
                        if (this.tableroMinas.tablero[i][j].hasBomba && casilla.classList.contains('bandera') === false && this.tableroMinas.tablero[i][j].isDesvelada === false) {
                            this.desvelarTablero(container);
                        }
                        //Desvela la casilla, si es 0, desvela las casillas adyacentes
                        else if (casilla.classList.contains('bandera') === false && this.tableroMinas.tablero[i][j].isDesvelada === false) {
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
                                this.desvelarTablero(container);
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
        if (Tablero.casillasDesveladas < (this.tableroMinas.altura * this.tableroMinas.anchura) - this.tableroMinas.minas)
            alert('Has perdido'); //Para que solo salga la alerta si pierdes ya que también se usa este tablero si ganas.
        for (let i = 0; i < this.tableroMinas.altura; i++) {
            let fila = container.children[i];
            for (let j = 0; j < this.tableroMinas.anchura; j++) {
                if (this.tableroMinas.tablero[i][j].hasBomba) {
                    fila.children[j].classList.add('bomba');
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
        if (tableroObject[Y][X].getN() == 0 && Y + 1 < this.tableroMinas.altura && X - 1 >= 0 && tableroObject[Y + 1][X - 1].isDesvelada === false) {
            Tablero.casillasDesveladas++;
            this.desvelarCerosConectados(tableroDom, tableroObject, X - 1, Y + 1);
        }
        if (tableroObject[Y][X].getN() == 0 && Y + 1 < this.tableroMinas.altura && X + 1 < this.tableroMinas.anchura && tableroObject[Y + 1][X + 1].isDesvelada === false) {
            Tablero.casillasDesveladas++;
            this.desvelarCerosConectados(tableroDom, tableroObject, X + 1, Y + 1);
        }
        if (tableroObject[Y][X].getN() == 0 && Y - 1 >= 0 && tableroObject[Y - 1][X].isDesvelada === false) {
            Tablero.casillasDesveladas++;
            this.desvelarCerosConectados(tableroDom, tableroObject, X, Y - 1);
        }
        if (tableroObject[Y][X].getN() == 0 && Y - 1 >= 0 && X - 1 >= 0 && tableroObject[Y - 1][X - 1].isDesvelada === false) {
            Tablero.casillasDesveladas++;
            this.desvelarCerosConectados(tableroDom, tableroObject, X - 1, Y - 1);
        }
        if (tableroObject[Y][X].getN() == 0 && Y - 1 >= 0 && X + 1 < this.tableroMinas.anchura && tableroObject[Y - 1][X + 1].isDesvelada === false) {
            Tablero.casillasDesveladas++;
            this.desvelarCerosConectados(tableroDom, tableroObject, X + 1, Y - 1);
        }
        //Un if para cada casilla adyacente.
    }
}

function init() { // Inicializa el juego

    let altura = document.getElementById('Alto').value;
    let anchura = document.getElementById('Ancho').value;
    let minas = document.getElementById('Minas').value;
    juego = new PlayerInteraction(altura, anchura, minas);
    juego.checkTablero();
    
}
