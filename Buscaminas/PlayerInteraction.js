

    var tableroMinas; //Aqui se guardara el tablero
    
/*     constructor(altura, anchura, minas) {
        tableroMinas = new Tablero(altura, anchura, minas);

    } */
   
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
    
    this.pintarTableroDOM();

    


    function pintarTableroDOM(){
               
            container.remove();
            let container = document.createElement('div');
            container.id = 'container';
            for (let i = 0; i < tableroMinas.altura; i++) {
                let fila = document.createElement('div');
                fila.classList.add('fila');
                for (let j = 0; j < tableroMinas.anchura; j++) {
                    let casilla = tableroMinas.tablero[i][j];
                    casilla = document.createElement('div');
                    casilla.classList.add('celda');
                    casilla.classList.add('hidden'); //Se crea el html de las celdas y sus atributos
                    casilla.addEventListener('contextmenu', event => event.preventDefault());
                    casilla.setAttribute('data-x', j);
                    casilla.setAttribute('data-y', i);
                    
                    casilla.addEventListener("mouse",this.clickCasilla(Event));
                    fila.appendChild(casilla);
                }
                container.appendChild(fila);
            }

    }


    function clickCasilla(Event) { //Funcion que se ejecuta al clickar una casilla
        let j = this.getAttribute('data-x');
        let i = this.getAttribute('data-y');
        accionCasilla(i, j, Event);
        pintarTableroDOM();
    }
       
  

function init() { // Inicializa el juego

    let altura = document.getElementById('Alto').value;
    let anchura = document.getElementById('Ancho').value;
    let minas = document.getElementById('Minas').value;


    tableroMinas = new Tablero(altura, anchura, minas);
    console.log(tableroMinas);
    
}

