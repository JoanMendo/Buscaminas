
var tableroMinas;
let startButton = document.getElementById('startButton');
let minasButton = document.getElementById('Minas');
let anchuraButton = document.getElementById('Ancho');
let alturaButton = document.getElementById('Alto');

let buscaminasBorder = document.getElementById('buscaMinas');
buscaminasBorder.style.display = 'none';

function pintarTableroDOM() {
    buscaminasBorder.style.display = 'flex';
    //Esto borra el tableroDOM y lo reescribe cada vez que se clickea una casilla
    let container = document.getElementById('container');
    container.remove();
    container = document.createElement('div');
    container.id = 'container';
    container.style.display = 'block';
    buscaminasBorder.appendChild(container);

    for (let i = 0; i < tableroMinas.altura; i++) {
        let fila = document.createElement('div'); //El div que contiene las celdas
        fila.classList.add('fila');
        for (let j = 0; j < tableroMinas.anchura; j++) {
            let casillaObject = tableroMinas.tablero[i][j];
            casilla = document.createElement('div'); //Cada celda
            casilla.classList.add('celda');
            casilla.setAttribute('data-x', j);
            casilla.setAttribute('data-y', i);
            casilla.innerHTML = casillaObject.numero;

            if (casillaObject.hasBomba)
                casilla.classList.add('bomba');

            if ((casillaObject.isDesvelada || casillaObject.initialClick))
                casilla.classList.add('visible');

            else
                casilla.classList.add('hidden'); 

            if (casillaObject.hasBandera)
                casilla.classList.add('bandera'); //Se asignan las clases de las celdas

            casilla.addEventListener('contextmenu', Event => { Event.preventDefault(); clickBandera(Event) }); //Evento que se ejecuta al hacer click derecho

            casilla.addEventListener("click", this.clickCasilla);
            fila.appendChild(casilla);
        }
        container.appendChild(fila);
    }
}

function clickCasilla() { //Funcion que se ejecuta al clickar una casilla

    let j = this.getAttribute('data-x');
    let i = this.getAttribute('data-y');
    tableroMinas.accionCasilla(i, j);
    pintarTableroDOM();
}
function clickBandera(Event) {
    Event.target.classList.toggle('bandera'); //Añade o quita la clase bandera
    let casilla = tableroMinas.tablero[Event.target.getAttribute('data-y')][Event.target.getAttribute('data-x')];
    casilla.hasBandera = !casilla.hasBandera;
}



