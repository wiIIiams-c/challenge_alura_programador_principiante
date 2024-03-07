//declaro un array con las letras a encriptar para verificar y saltar las que no
const letrasEncriptar = ["a", "e", "i", "o", "u"];
const letrasDesencriptar = ["ai", "enter", "imes", "ober", "ufat"];

//se convierte a minusculas lo que esta en el texto a encriptar
//selecciono el textarea mediante su ID
let textoDeEntrada = document.getElementById("txtEntrada");
//luego a ese textarea le asigno el evento input que hace que cualquier
//cosa que escriba lo transforma a minuscula
textoDeEntrada.addEventListener("input", function() {
    this.value = this.value.toLowerCase();
});

//funcion encargada de encriptar el texto
function btnEncriptar(){
    //variable que se le va asignar el nuevo texto encriptado
    let nuevoTexto = "";
    //obtengo el texto que se va a encriptar
    let txtNoEncriptado = document.getElementById("txtEntrada").value;
    
    if(!validaCaracterEspacial(txtNoEncriptado)){
        alert("El texto ingresado no puede contener acentos o caracteres especiales!");
    }else{
        //recorro letra por letra para poder encriptar
        for (let index = 0; index < txtNoEncriptado.length; index++) {
            //asigno la letra de acuerdo a su indice
            let letra = txtNoEncriptado[index];
            //asigno y concateno la letra al texto nuevo
            //dentro del concat verifica si la letra es parte del arreglo para saber si encriptarla o no
            nuevoTexto = nuevoTexto.concat(letrasEncriptar.includes(letra)?traductorTexto(letra, "encriptar"):letra);
        }
        
        //asigno de salida el texto encriptado
        let textoSalida = document.getElementById("txtSalida");
        textoSalida.value = nuevoTexto;
        textoSalida.style.backgroundImage = "none";
        
        document.getElementById("btnCopiar").style.display = "block";
    }
}

function btnDesencriptar(){
    let txtEncriptado = document.getElementById("txtEntrada").value;
    //array para el texto desencriptado
    let nuevoTexto = [];
    //array para separar el texto de entrada por palabras
    let textoPorPartes = [];
    //separar cada palabra y guardarlo en array para verificar
    textoPorPartes = txtEncriptado.split(" ");

    if(!validaCaracterEspacial(txtEncriptado)){
        alert("El texto ingresado no puede contener acentos o caracteres especiales!");
    }else{
        textoPorPartes.forEach(elementMain => {
            let coincidencias = [];
            let nuevaPalabra = elementMain;
            let letrasDesencriptarJoin = letrasDesencriptar.join("|");
            let expresionRegular = new RegExp(letrasDesencriptarJoin, "g");
            
            coincidencias = [...elementMain.matchAll(expresionRegular)];
            coincidencias.forEach(elementSub => {
                nuevaPalabra = nuevaPalabra.replace(elementSub[0], traductorTexto(elementSub[0], "desencriptar"))
            });
            
            //agrego la palabra desencriptada a un nuevo array
            nuevoTexto.push(nuevaPalabra);
        });

        //al texto de salida le asigno el texto desencriptado separado por espacios
        document.getElementById("txtSalida").value = nuevoTexto.join(" ");
        document.getElementById("txtSalida").style.backgroundImage = "none";
        
        document.getElementById("btnCopiar").style.display = "block";
    }
}

function validaCaracterEspacial(texto){
    const regexpAcentos = /^[a-z0-9\s]+$/;
    
    if(regexpAcentos.test(texto))
        return true;

    return false;
}

//funcion encargada de encriptar o desencriptar el texto
function traductorTexto(texto, accion){
    let textoTraducido = "";
    let letraEncriptada = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat",
    };

    if(accion === "desencriptar"){
        textoTraducido = Object.keys(letraEncriptada).find((key) => letraEncriptada[key] === texto);
    }else if(accion === "encriptar"){
        textoTraducido = letraEncriptada[texto];
    }

    return textoTraducido;
}

//al boton de copiar le agrego el evento click
//a la variable copiarSalida le asigno lo que contiene el textarea
//luego selecciono lo que esta en el textarea
//posteriormente ejecuto el comando copiar
document.querySelector('.copiar').addEventListener('click', () => {
    let copiarSalida = document.getElementById('txtSalida');

    copiarSalida.select();
    document.execCommand('copy');

    document.getElementById('txtEntrada').value = "";
    document.getElementById('txtSalida').value = "";
    document.getElementById("btnCopiar").style.display = "none";

    alert('El texto ha sido copiado!');

});