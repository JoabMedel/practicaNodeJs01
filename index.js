
//todos estos son mis modulos de node.

let http = require("http");
let fs = require("fs");
//path viene en node y nos sirve para manejar las rutas que tenemos en nuestro equipos
let mime = require("mime");

http.createServer((request,response) => {
    //dentro se escribe toda la logica al momento de hacer una peticion
    // response.setHeader("Content-Type", "text/html; charset=utf-8");
    if(request.method === "GET"){
        switch(request.url){
            case "/contacto":
                readFile("/contacto.html", response);
                break;
            case "/":
                readFile("/index.html", response);
                break;
            case "/nosotros":
                readFile("/about.html", response);
                break;
            case "/proyectos":
                readFile("/proyects.html", response);
                break;
            case "/favicon.ico":
                response.setHeader("Content-Type", "image/x-icon");
                readFile("/favicon.ico", response);
                break;
            default:
                readFile(request.url, response);
                break;
        }
    }else if(request.method === "POST"){
        switch(request.url){
            case "/usuarios":
                agregarUsuarios(request,response);
                break;
            default:
                readFile(request.url, response);
                break;
        }
    }
}).listen(8080)

const readFile = (url, response) => {
    //__dirname es para definir rutas absolutas(ejemplo leer mi css o cualquier archivo)
    let urlF = __dirname + url;
    fs.readFile(urlF,(error,content) => {
        if(!error){
            // response.setHeader("Content-Type","text/css")
            // setcontentType(path.extname(urlF),response);
            response.setHeader("Content-Type", mime.getType(urlF));
            response.end(content);
        }else{
            // tambien de esta manera -> response.statusCode = 404;
            response.writeHead(404);
            response.end("<h1>404</h1>");   
        }
    });
}

const agregarUsuarios = (request,response) => {
    let data = '';

    //cuando se esten recibiendo dartos
    request.on('data', chunk => {
        data += chunk;
    });

    //Cuando se terminen de procesar los datos
    request.on('end',() => {
        let datos = data.toString();
        console.log("fin del stream");
        //1er argumento -> la ruta del archivo en el que queremos escribir.
        //se creara el archivo si no existe en la ruta especificada.
        //2do argumento -> El conotenido que queremos escribir,
        //3er argumrnto -> funcion de callback que nos "notificara" en caso de que haya un error al escribir
        //en el archivo
        console.log(datos.split("&"));
        let user = {
            name: datos.split("&")[0].split("=")[1],
            lastename: datos.split("&")[1].split("=")[1],
            email: datos.split("&")[2].split("=")[1],
            password: datos.split("&")[3].split("=")[1],
        }
        fs.writeFile("usuarios2.txt",JSON.stringify(user), (error)=>{
            if(error){
                console.log(error);
            }else{
                //vamos a anadir a la cabecera la locacion donde sera el reedireccionamiento en este caso
                //sera a "index.htm" o "/" que es por defecto
                response.setHeader("Location", "/");
                //agregamos el status code 302 para que se haga la reedireccion debido a que es el status que se
                //requiere de otra forma al no indicarselo el status sera 200 pero no se reedireccionara a aindex.
                response.statusCode = 302;
                //indicamos el .end() para finalizar la respuesta y que no se quede colgado nuestro sistema.
                response.end();
            }
        })
    });

    //por si se llega a captar algun error al enviar los datos.
    request.on('error', error => {
        console.log(error)
    })
}
//esto es para filtrar mis estilos de content type y aplicar segun el tipo

//la siguiente funcion fue sustituida por "mime" para el filtrado de los content type

// const setcontentType = (ext, response) => {
//     if(ext === ".css") {
//         response.setHeader("Content-Type","text/css");
//     }else if(ext === ".html"){
//         response.setHeader("Content-Type","text/html");
//     }
// }