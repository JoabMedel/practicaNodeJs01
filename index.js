//todos estos son mis modulos de node.

let fs = require("fs");
let express = require("express");
let path = require("path");
let app = express();

//Tenemos que hacer un app get por cada ruta que estemos manejando.
//El orden que tenemos para los app get es de arriba a abajo lo que es el filtrado.


//Middleware.

//Vamos a crear una carpeta public donde almacenaremos todos nuestros archivos estatico.
//con la siguiente funcion "app.use(express.static("public"))" vamos a servir todos nuestros
//archivos estaticos para que sea visible la configuracion.
//Todo lo que este afuera de public no se va a poder leer

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));//Este middleware nos sirve para procesar los datos
//que son enviados a traves del formulario y va a colocar los datos transformados sobre request.body

//app.get actua sobre aquellas peticiones que sean de tipo "GET" unicamente con tipo get.
app.get("/", (request,response) => {
    response.sendFile(path.join(__dirname,"index.html"))
});

app.get("/contacto", (request,response) => {
    response.sendFile(path.join(__dirname,"contacto.html"))
});

app.get("/nosotros", (request,response) => {
    response.sendFile(path.join(__dirname,"about.html"))
});

app.get("/proyectos", (request,response) => {
    response.sendFile(path.join(__dirname,"proyects.html"))
});

app.post("/usuarios", (request,response) => {
    console.log(request.body)
    fs.writeFile("usuarios.txt", JSON.stringify(request.body), (error) => {
        if(error){
            console.log(error);
        }
        response.redirect("/");
    });
});

//app.use va a actuar sobre aquellas peticiones que sean de tipo "get,post,delte,put"
app.use((request, response) => {
    response.sendFile(path.join(__dirname,"404.html"));
});

app.listen(8080, () => {
    console.log("servidor iniciado en el puerto 8080");
})

//path viene en node y nos sirve para manejar las rutas que tenemos en nuestro equipos
