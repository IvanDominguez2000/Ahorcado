function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}
console.log(document.cookie);

let paginaDibuix, paginaParaula, paginaEstadisticas;
var listadepalabras, numeroDePalabras, numeroAleatorio, palabraJuego;
var numeroErrores = 0;
var imagen, letra;
var palabraFinal = " ";
var numeroAbandonos = 0;
var estadoPalabra = [];
var Palabraoculta = " ";

document.getElementById("finalizar").addEventListener("click", abandonar);
document.getElementById("introducirLetra").addEventListener("click", introducirLetra);

iniciarPartida();

function abrirVentanas() {
    paginaDibuix = window.open("PaginaDibuix.html", "PaginaDibuix", "top=25, left=1100, width=400, height=200");
    paginaParaula = window.open("PaginaParaula.html", "PaginaParaula", "top=350, left=1100, width=400, height=200");
    paginaEstadisticas = window.open("PaginaEstadisticas.html", "PaginaEstadisticas", "top=575, left=600, width=400, height=200");
}
function cerrarVentanas() {
    paginaDibuix.close();
    paginaParaula.close();
    paginaEstadisticas.close();
}

function iniciarPartida() {
    var palabrasAñadidas = prompt("Escribe las palabras con las que quieres jugar:");
    //si el vector contiene "," , ponemos el .trim()para borrar los espacios si hay
    // y ponemos las palabras en minúsculas, para que no hayan errores, el .split, es para 
    //separar las palabras con ,
    if (palabrasAñadidas.includes(",")) {
        listadepalabras = palabrasAñadidas.trim().toLowerCase().split(",");
        console.log(listadepalabras);
        //igualamos la variable para saber el numero de palabras introducidas
        //ponemos el length para saber cuantas ha añadido
        numeroDePalabras = listadepalabras.length;
        console.log(numeroDePalabras);
        //abrimos la variable y la igualamos a Math.floor(Math.random() * (numeroDePalabras));
        //para que eliga una palabra aleatoria con el Math.random, el Math.floor devuelve un numero.
        numeroAleatorio = Math.floor(Math.random() * (numeroDePalabras));
        console.log(numeroAleatorio);
        //del array listadeplalabras coge la palabra del numero aleatorio escogido antes
        palabraJuego = listadepalabras[numeroAleatorio];
        console.log(palabraJuego);
    }
    //si no pone ninguna palabra iniciamos el juego con las predefinidas 
    //que hemos puesto nosotros
    else if (palabrasAñadidas == "") {
        //hacemos lo mismo que como si hubiese añadido palabras, pero con las nuestras
        listadepalabras = ["nicolau", "copernic", "desenvolupament", "web", "javascript"];
        numeroDePalabras = listadepalabras.length;
        numeroAleatorio = Math.floor(Math.random() * (numeroDePalabras));
        palabraJuego = listadepalabras[numeroAleatorio];
        console.log(palabraJuego);
        //si introduce una palabra
    } else {
        palabraJuego = palabrasAñadidas.trim().toLowerCase();
        console.log(palabraJuego);
    }
    //abrimos las ventanas del dibujo, palabra y estadisticas
    abrirVentanas();
    //lo iniciamos todo por si inicia una nueva partida
    estadoPalabra = [];
    Palabraoculta = '';
    //llenamos la palabra, con el lenght para saber las letras que tiene
    // y por cada letra le ponemos un guion bajo
    //imprimimos la palabra y las estadisticas con _ que vera el usuario, hacemos el espacio
    //para que e vean separados los "_".
    for (var i = 0; i < palabraJuego.length; i++) {
        estadoPalabra[i] = "_";
        Palabraoculta = Palabraoculta + " " + estadoPalabra[i];
    }
    palabraOculta();
    estadisticas();
}

//preparamos la plabraOculta para empezar
function palabraOculta() {
    paginaParaula.window.onload = function () {
        paginaParaula.window.document.getElementById("Palabraoculta").innerText = Palabraoculta;
    };
}
//cambiamos el estado de la palabra en la pagina de la palabra
function cambiarPalabraOculta() {
    paginaParaula.window.document.getElementById("Palabraoculta").innerText = Palabraoculta;
}

function continuarPartida() {
    //cerramos las ventanas hijas para seguir jugando
    cerrarVentanas();
    //volvemos a tener una palabra random del array
    numeroDePalabras = listadepalabras.length;
    numeroAleatorio = Math.floor(Math.random() * (numeroDePalabras));
    palabraJuego = listadepalabras[numeroAleatorio];
    console.log(palabraJuego);
    //abrimos las ventanas hijas
    abrirVentanas();
    //iniciamos los campos
    estadoPalabra = [];
    Palabraoculta = '';
    //llenamos la palabra con "_"
    for (var i = 0; i < palabraJuego.length; i++) {
        estadoPalabra[i] = '_';
        Palabraoculta = Palabraoculta + " " + estadoPalabra[i];
    }
    palabraOculta();
    estadisticas();
}

//cambiamos las imagenes segun van incrementando los errores
function cambiarImagen(numeroErrores) {
    switch (numeroErrores) {
        case 1:
            imagen = "Imagenes/1.png";
            break;
        case 2:
            imagen = "Imagenes/2.png";
            break;
        case 3:
            imagen = "Imagenes/3.png";
            break;
        case 4:
            imagen = "Imagenes/4.png";
            break;
        case 5:
            imagen = "Imagenes/5.png";
            alert("  PERDISTE !!!  ");
            //ponemos la variable a 0 para nuevas partidas
            var numeroPerdidas = 0;
            //cuando perdemos si la cookie esta en 0 la incrementamos a 1
            if (getCookie('Perdidas') == 0) {
                document.cookie = "Perdidas=" + 1;
                //vamos incrementando en 1 cada vez que perdemos a la cookie Perdidas
                //parseInt devuelve un valor entero
            } else {
                numeroPerdidas = parseInt(getCookie('Perdidas')) + 1;
                document.cookie = "Perdidas=" + numeroPerdidas;
            }
            //cambiamos las estadisticas con las nuevas y 
            //para iniciar partida despues de perder ponemos un timeout de 10 s
            cambiarEstadisticas();
            setTimeout(continuarPartida, 10000);
            break;
    }
    paginaDibuix.window.document.getElementById("imagenPerdida").src = imagen;
}

//introducir y comprobar las letras que añade
function introducirLetra() {

    letra = prompt("Intruduce una letra: ");
    letra = letra.trim().toLowerCase();
    //comprobar si la letra esta o no en la palabra
    if (palabraJuego.indexOf(letra) != -1) {
        alert("La letra " + letra.toUpperCase() + " si esta");
        // miramos el estado de la palabraJuego y si esta la letra la modificamos
        //.charAt porque es un caracter la letra y no una palabra
        for (var i = 0; i < palabraJuego.length; i++) {
            if (palabraJuego.charAt(i) == letra) {
                estadoPalabra[i] = letra;
            }
        }
        Palabraoculta = "";
        // modificamos la palabra y le enseñamos al usuario la nueva palabra modificada
        for (var i = 0; i < estadoPalabra.length; i++) {
            Palabraoculta = Palabraoculta + " " + estadoPalabra[i];
        }
        cambiarPalabraOculta();
        //ya que hemos puesto espacios en la palabra, para que se vean los guiones separados
        //los tenemos que eliminar para verificar la posicion correcta
        palabraFinal = "";
        for (var i = 0; i < estadoPalabra.length; i++) {
            palabraFinal = palabraFinal + estadoPalabra[i];
        }
        console.log(palabraFinal);
        if (palabraJuego == palabraFinal) {
            alert('   Ganaste !!!   ');
            var numeroVictorias = 0;
            //si la cookie no esta definida la creamos con el valor 1 en victoria
            if (getCookie('Ganadas') == 0) {
                document.cookie = "Ganadas=" + 1;
                //modificamos el valor de la cookie cada vez que adivinemos la palabra entera
            } else {
                numeroVictorias = parseInt(getCookie('Ganadas')) + 1;
                document.cookie = "Ganadas=" + numeroVictorias;
            }
            cambiarEstadisticas();
            //cuando ganamos ponemos un timeout de 3 segundos(porque nos parecia logico)
            setTimeout(continuarPartida, 3000);
        }
    } else {
        alert("La letra " + letra.toUpperCase() + " no esta");
        //si la letra es incorrecta sumamos 1 a la variable numErrores 
        //para que cambie la foto llamamos a la funcion y le decimos la variable,
        //que ahora es 1 y cambie la foto
        numeroErrores = numeroErrores + 1;
        cambiarImagen(numeroErrores);
        if (numeroErrores == 5) {
            //si hacemos el maximo de errores iniciamos la variable a 0 para las siguientes partidas
            numeroErrores = 0;
        }
    }
}

function abandonar() {
    //si la cookie no ha estado definida la creamos con el valor 1
    if (getCookie('Abandonos') == 0) {
        document.cookie = "Abandonos=" + 1;
        //cambiamos el valor de la cookie Abandonos y la vamos incrementando cada vez que pase
    } else {
        numeroAbandonos = parseInt(getCookie('Abandonos')) + 1;
        document.cookie = "Abandonos=" + numeroAbandonos;
    }
    //cerramos las ventanas hijas y ponemos una espera de 5 segundos
    //cadavez que abandone el jugador (especificado en el pdf)
    cerrarVentanas();
    setTimeout(iniciarPartida, 5000);
}

//cargamos las estadisticas de las cookies
function estadisticas() {
    var cookieVictoria = getCookie("Ganadas");
    var cookieDerrota = getCookie("Perdidas");
    var cookieAbandonar = getCookie("Abandonos");

    //onload es para que cuando cargues la pagina salga directamente esto
    paginaEstadisticas.window.onload = function () {
        paginaEstadisticas.window.document.getElementById("Ganadas").innerText = "Ganadas: " + cookieVictoria;
        paginaEstadisticas.window.document.getElementById("Perdidas").innerText = "Perdidas: " + cookieDerrota;
        paginaEstadisticas.window.document.getElementById("Abandonos").innerText = "Abandonos: " + cookieAbandonar;
    };
}
//actualizamos las cookies con lis id's
function cambiarEstadisticas() {
    var cookieVictoria = getCookie("Ganadas");
    var cookieDerrota = getCookie("Perdidas");
    var cookieAbandonar = getCookie("Abandonos");

    paginaEstadisticas.window.document.getElementById("Ganadas").innerText = "Ganadas: " + cookieVictoria;
    paginaEstadisticas.window.document.getElementById("Perdidas").innerText = "Perdidas: " + cookieDerrota;
    paginaEstadisticas.window.document.getElementById("Abandonos").innerText = "Abandonos: " + cookieAbandonar;
}