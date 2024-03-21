document.getElementById("Form").addEventListener("submit", function (event) {
    event.preventDefault();
    let inputList = getInputs();
    let errorList = getInputsErrors();
    let containersList = [];
    for (let i = 0; i < inputList.length; i++) {
        containersList[i] = inputList[i].parentNode;
    }
    let isValid = true;
    for (let i = 0; i < inputList.length; i++) {
        inputList[i].setAttribute("required", "");
        if(inputList[i].validity.valueMissing){
            inputList[i].setCustomValidity("Campo obligatorio");
            errorList[i].textContent = "Campo obligatorio";
            containersList[i].style.backgroundColor = "#f7a59f";    
            isValid = false;
        }
        else{
            containersList[i].style.backgroundColor = "white";   
        }
        
    }
})

document.querySelectorAll("Form").addEventListener("change", function (event) {
    let inputList = getInputs();
    let errorList = getInputsErrors();
    let containersList = [];
    for (let i = 0; i < inputList.length; i++) {
        containersList[i] = inputList[i].parentNode;
    }
    for (let i = 0; i < inputList.length; i++) {
        if(inputList[i].validity.valueMissing){
            inputList[i].setCustomValidity("Campo obligatorio");
            errorList[i].textContent = "Campo obligatorio";
            containersList[i].style.backgroundColor = "#f7a59f";    
        }
        else{
            containersList[i].style.backgroundColor = "white";   
        }
    }

});

function getInputs(){
    let nombre = document.getElementById('Nombre');
    let apellido = document.getElementById('Apellido');
    let fechaNacimiento = document.getElementById('FechaNacimiento');
    let nick = document.getElementById('Nick');
    let mail = document.getElementById('Mail');
    let anchura = document.getElementById('Filas');
    let altura = document.getElementById('Columnas');
    let minas = document.getElementById('Bombas');
    let password = document.getElementById('Password');
    let number = document.getElementById('Number');
    let tarjetaCredito = document.getElementById('TarjetaDeCredito');
    let caducidadTarjeta = document.getElementById('CaducidadTarjeta');
    let cvv = document.getElementById('CVV');
    let direccion = document.getElementById('Direccion');
    let inputList = [nombre, apellido, fechaNacimiento, nick, mail, anchura, altura, minas, password, number, tarjetaCredito, caducidadTarjeta, cvv, direccion];
    return inputList;

    
}
function getInputsErrors(){
    let errorNombre = document.getElementById('ErrorNombre');
    let errorApellido = document.getElementById('ErrorApellido');
    let errorFechaNacimiento = document.getElementById('ErrorFechaNacimiento');
    let errorNick = document.getElementById('ErrorNick');
    let errorMail = document.getElementById('ErrorMail');
    let errorAnchura = document.getElementById('ErrorFilas');
    let errorAltura = document.getElementById('ErrorColumnas');
    let errorMinas = document.getElementById('ErrorMinas');
    let errorPassword = document.getElementById('ErrorPassword');
    let errorNumber = document.getElementById('ErrorNumber');
    let errorTarjetaCredito = document.getElementById('ErrorTarjetaDeCredito');
    let errorCaducidadTarjeta = document.getElementById('ErrorCaducidadTarjeta');
    let errorCVV = document.getElementById('ErrorCVV');
    let errorDireccion = document.getElementById('ErrorDireccion');
    let errorList = [errorNombre, errorApellido, errorFechaNacimiento, errorNick, errorMail, errorAnchura, errorAltura, errorMinas, errorPassword, errorNumber, errorTarjetaCredito, errorCaducidadTarjeta, errorCVV, errorDireccion];
    return errorList;
}