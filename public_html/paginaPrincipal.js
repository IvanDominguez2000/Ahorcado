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
            var listadepalabras, letra, palabraJuego;
            var numeroDePalabras, numeroAleatorio, imagen;
            var estadoPalabra = [];
            var numeroAbandonos = 0;
            var Palabraoculta = " ";
            var palabraFinal = " ";
            var numeroErrores = 0;

            document.getElementById("finalizar").addEventListener("click", abandonar);
            document.getElementById("introducirLetra").addEventListener("click", introducirLetra);

            iniciarPartida();

            function abrirVentanas(){
                paginaDibuix = window.open("PaginaDibuix.html", "PaginaDibuix", "top=25, left=1100, width=400, height=200");
                paginaParaula = window.open("PaginaParaula.html", "PaginaParaula", "top=350, left=1100, width=400, height=200");
                paginaEstadisticas = window.open("PaginaEstadisticas.html", "PaginaEstadisticas", "top=575, left=600, width=400, height=200");
            }
            function cerrarVentanas(){
                paginaDibuix.close();
                paginaParaula.close();
                paginaEstadisticas.close();     
            }
            
            function iniciarPartida(){ 
                var palabrasAñadidas = prompt("Escribe las palabras con las que quieres jugar:");
                //si el vector contiene "," , ponemos el .trim()para borrar los espacios si hay
                // y ponemos las palabras en minúsculas, para que no hayan errores, el .split, es para 
                //separar las palabras con ,
                if(palabrasAñadidas.includes(",")){
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
                else if(palabrasAñadidas == ""){
                    //hacemos lo mismo que como si hubiese añadido palabras, pero con las nuestras
                    listadepalabras = ["nicolau", "copernic", "desenvolupament", "web", "javascript"];
                    numeroDePalabras = listadepalabras.length;
                    numeroAleatorio = Math.floor(Math.random() * (numeroDePalabras));
                    palabraJuego = listadepalabras[numeroAleatorio];
                    console.log(palabraJuego);
                //si introduce una palabra
                }
                else {
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
                for (var i=0; i < palabraJuego.length; i++) {
                    estadoPalabra[i] = "_";
                    Palabraoculta = Palabraoculta + " " + estadoPalabra[i];
                }         
                palabraOculta();
                estadisticas();
            }
