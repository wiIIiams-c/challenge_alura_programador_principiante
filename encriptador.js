//Debe funcionar solo con letras minúsculas OK
//No deben ser utilizados letras con acentos ni caracteres especiales
//Debe ser posible convertir una palabra para la versión encriptada también devolver una palabra encriptada para su versión original.

//declaro un array con las letras a encriptar para verificar y saltar las que no
let letrasEncriptar = ["a", "e", "i", "o", "u"];
let letrasDesencriptar = ["ai", "enter", "imes", "ober", "ufat"];

//se convierte a minusculas lo que esta en el texto a encriptar
//selecciono el textarea mediante su ID
let textoDeEntrada = document.getElementById("txtEntrada");
//luego a ese textarea le asigno el evento input que hace que cualquier
//cosa que escriba lo trasnforma a minuscula
textoDeEntrada.addEventListener("input", function() {
    this.value = this.value.toLowerCase();
});

//funcion encargada de encriptar el texto
function txtEncriptar(){
    //variable que se le va asignar el nuevo texto encriptado
    let nuevoTexto = "";
    //obtengo el texto que se va a encriptar
    let txtNoEncriptado = document.getElementById("txtEntrada").value;

    //recorro letra por letra para poder encriptar
    for (let index = 0; index < txtNoEncriptado.length; index++) {
        //asigno la letra de acuerdo a su indice
        let letra = txtNoEncriptado[index];
        //asigno y concateno la letra al texto nuevo
        //dentro del concat verifica si la letra es parte del arreglo para saber si encriptarla o no
        nuevoTexto = nuevoTexto.concat(letrasEncriptar.includes(letra)?traductorTexto(letra, "encriptar"):letra);
    }
    
    //asigno de salida el texto encriptado
    document.getElementById("txtSalida").value = nuevoTexto;
}

function txtDesencriptar(){
    let txtEncriptado = document.getElementById("txtEntrada").value;
    //array para el texto desencriptado
    let nuevoTexto = [];
    //array para separar el texto de entrada por palabras
    let textoPorPartes = [];
    //separar cada palabra y guardarlo en array para verificar
    textoPorPartes = txtEncriptado.split(" ");

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