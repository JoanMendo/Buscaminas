document.getElementById("Form").addEventListener("submit", function (event) {
    event.preventDefault();
    let nombre = document.getElementById('Nombre').value.trim();
    let apellido = document.getElementById('Apellido').value.trim();
    let fechaNacimiento = document.getElementById('FechaNacimiento').value;
    let nick = document.getElementById('Nick').value.trim();
    let mail = document.getElementById('Mail').value.trim();
    let anchura = document.getElementById('Filas').value;
    let altura = document.getElementById('Columnas').value.trim;
    let minas = document.getElementById('Bombas').value;
    let password = document.getElementById('Password').value.trim();
    let number = document.getElementById('Number').value.trim();
    let tarjetaCredito = document.getElementById('TarjetaDeCredito').value.trim();
    let caducidadTarjeta = document.getElementById('CaducidadTarjeta').value;
    let cvv = document.getElementById('CVV').value.trim();
    let direccion = document.getElementById('Direccion').value.trim();
     
    if (nombre === '') {
        alert('Please fill in all fields');
        return false;
    }
    alert('Form submitted!');
    return true;
})