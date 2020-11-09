            let nodoIntentos = document.querySelector('#intentos');
            let nodoHistorial = document.querySelector('#historial');
            var escritas = prompt("Escribe las palabras con las que quieres jugar").split(",");  

            window.open("PaginaDibuix.html", "Dibuix", "top=25, left=1100, width=400, height=200");
            window.open("PaginaEstadisticas.html", "Estadisticas", "top=350, left=1100, width=400, height=200");
            window.open("PaginaParaula.html", "Paraula", "top=575, left=600, width=400, height=200");

            function arrayPalabras(){
                if(escritas == ""){
                   escritas = ["desenvolupament","web","nicolau","copernic"];
                }console.log(escritas);                
                }
            arrayPalabras();
            
            function prepararJuego () {
                //// 1 Selecciono una palabra aleatoria de listaPalabra
                //// 1.1 Obtengo la posicion aleatoria
                let posAleatoriaListaPalabras = _.random(escritas.length - 1);
                //// 1.2 Obtengo la palabra aleatoria
                let palabraAleatoria = escritas[posAleatoriaListaPalabras];
                //// 1.3 Separo la palabra en letras y lo guardo
                palabraAdivinar = palabraAleatoria.split('');
                //// 2 Preparo el array que va a ver el usuario. Tendrá el mismo número de guiones que letras en palabraAdivinar
                for (let letra of palabraAdivinar) {
                    palabraMostrar.push('_ ');
                }
                //// 3 Dibuja todo lo necesario
                dibujarJuego();
            }