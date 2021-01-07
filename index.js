let http = require("http");
let fs = require("fs");

http.createServer((request,response) => {
    //dentro se escribe toda la logica al momento de hacer una peticion
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    switch(request.url){
        case "/contacto":
            readFile("./contacto.html", response);
            break;
        case "/":
            readFile("./index.html", response);
            break;
        case "/nosotros":
            readFile("./about.html", response);
            break;
        case "/proyectos":
            readFile("./proyects.html", response);
            break;
        case "/favicon.ico":
            response.setHeader("Content-Type", "image/x-icon");
            readFile("./favicon.ico", response);
            break;
        default:
            response.statusCode = 404;
            readFile("./404.html", response);
            break;
    }
}).listen(8080)

const readFile = (path, response) => {
    fs.readFile(path,(error,content) => {
        if(!error){
            response.write(content);
            response.end();
        }
    });
}