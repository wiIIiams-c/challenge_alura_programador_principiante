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

function txtEncriptar(){
    let nuevoTexto = "";
    let txtNoEncriptado = document.getElementById("txtEntrada").value;

    for (let index = 0; index < txtNoEncriptado.length; index++) {
        let letra = txtNoEncriptado[index];
        nuevoTexto = nuevoTexto.concat(letrasEncriptar.includes(letra)?traductorTexto(letra, "encriptar"):letra);
    }
    
    document.getElementById("txtSalida").value = nuevoTexto;
}

function txtDesencriptar(){
    let nuevoTexto = [];
    let txtEncriptado = document.getElementById("txtEntrada").value;
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

        nuevoTexto.push(nuevaPalabra);
    });
    
    document.getElementById("txtSalida").value = nuevoTexto.join(" ");
}

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