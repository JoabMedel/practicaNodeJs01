let http = require("http");

http.createServer((request,response) => {
    //dentro se escribe toda la logica al momento de hacer una peticion
        if (err) return done(err)
        if(request.url === "/contacto"){
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.write("<h1>Contacto</h1>");
            response.end();
        }else if(request.url === "/"){
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.write("<h1>pagina de inicio</h1>");
            response.end();
        }else{
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.write("<h1>404</h1>");
            response.end();
        }
        // respond to request
}).listen(8080)