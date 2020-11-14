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
                
                
            function obrirFinestres(){
                paginaDibuix = window.open("PaginaDibuix.html", "PaginaDibuix", "top=25, left=1100, width=400, height=200");
                paginaParaula = window.open("PaginaParaula.html", "PaginaParaula", "top=350, left=1100, width=400, height=200");
                paginaEstadisticas = window.open("PaginaEstadisticas.html", "PaginaEstadisticas", "top=575, left=600, width=400, height=200");
            }
            function tancarFinestres(){
                paginaDibuix.close();
                paginaParaula.close();
                paginaEstadisticas.close();     
            }
            
            function estadisticas(){
                var cookieVictoria = getCookie("Ganadas");
                var cookieDerrota = getCookie("Perdidas");
                var cookieAbandonar = getCookie("Abandonos");

                paginaEstadisticas.window.onload = function() {
                    paginaEstadisticas.window.document.getElementById("Ganadas").innerText = "Ganadas: " + cookieVictoria;
                    paginaEstadisticas.window.document.getElementById("Perdidas").innerText = "Perdidas: " + cookieDerrota;
                    paginaEstadisticas.window.document.getElementById("Abandonos").innerText = "Abandonos: " + cookieAbandonar;
                };      
            }
            //actualitzem les cookies
            function cambiarEstadisticas(){
                var cookieVictoria = getCookie("Ganadas");
                var cookieDerrota = getCookie("Perdidas");
                var cookieAbandonar = getCookie("Abandonos");

                paginaEstadisticas.window.document.getElementById("Ganadas").innerText = "Ganadas: " + cookieVictoria;
                paginaEstadisticas.window.document.getElementById("Perdidas").innerText = "Perdidas: " + cookieDerrota;
                paginaEstadisticas.window.document.getElementById("Abandonos").innerText = "Abandonos: " + cookieAbandonar;   
            }