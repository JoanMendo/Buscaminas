
class Tablero {
    container; 
    altura;
    anchura;
    minas;
    tablero;
    constructor(altura, anchura, minas) {
        this.altura = altura;
        this.anchura = anchura;
        this.minas = minas;
        this.tablero = [];
        this.container = document.getElementById('tablero');
        this.generarTablero(altura, anchura);
    }
    generarTablero(altura, anchura) {
        for (let i = 0; i < altura; i++) {
            let fila = document.createElement('div');
            fila.classList.add('fila');
            this.tablero[i] = [];
            for (let j = 0; j < anchura; j++) {
                let celda = new Celda(i, j);
                fila.appendChild(celda.element);
                this.tablero[i][j] = celda;
            }
            container.appendChild(fila);
        }
    }
}
class Celda {
posicionX;
posicionY;
hasBandera;
hasBomba;
esCasillaInicial;
isDesvelada;
numero;
constructor(posicionX, posicionY) {
    this.posicionX = posicionX;
    this.posicionY = posicionY;
    this.element = document.createElement('div');
    this.element.classList.add('celda');
    this.element.classList.add('hidden');
    this.element.onclick = () => this.desvelarCelda();
    this.element.onauxclick = () => this.element.classList.toggle('bandera');
    }
    desvelarCelda() {

        this.element.classList.remove('hidden');
        this.element.classList.add('visible');
        this.isDesvelada = true;
    }
}

class Player {
    
}
function init() {
    let altura = document.getElementById('Alto').value;
    let anchura = document.getElementById('Ancho').value;
    let minas = document.getElementById('Minas').value;
    let tablero = new Tablero(altura, anchura, minas);
    console.log(si);
}

function checkValues() {
    let altura = document.getElementById('Alto').value;
    let anchura = document.getElementById('Ancho').value;
    let minas = document.getElementById('Minas').value;
    if (altura < 8 || anchura < 8 || minas > (altura * anchura) * 0.33 || altura > 24 || anchura > 32 || minas < 1) {
        alert('La altura debe estar entre 8 y 24, la anchura entre 8 y 32 y el número de minas debe ser menor al 33% del total de casillas y mayor a 0');
    } 
    else {
        let startButton = document.getElementById('startButton');
        startButton.disabled = true;
        init();
    }
}
