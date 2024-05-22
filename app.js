const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
    const file = request.url == '/' ? './WWW/index.html' : `./WWW/${request.url}`; // Extrae de la peticion la URL que está pidiendo el cliente
    if (request.url == "/regs")
    {
        let data = []
        request.on("data", value => { // Un listener. Cuando escuche a "data", ejecutará una función flecha para regresar un valor.
            data.push(value);
        }).on("end", () => { // Cuando termine, llama otra función flecha que concatena y contesta.
            let params = Buffer.concat(data).toString();
            response.write(params);
            response.end();
        }); 
    }

    fs.readFile(file, (err, data) => { // Lee un archivo de texto y trae su contenido
        if (err) // Si existe algun error...
        {
            response.writeHead(404, {"Content-Type": "text/plain"}); // Permite escribir el status de la cabezera y tipo de contenido a regresar
            response.write("not found");
            response.end();
        }
        else // Si sí pudo leerlo
        {
            const extension = request.url.split('.').pop(); // Entregará el tipo de archivo que se requiere mostrar. El pop saca lo que está después del split. 
            switch(extension)
            {
                case "txt":
                    response.writeHead(200, {"Content-Type": "text/plain"}); // Regresa la pagina (guardada en data), la cual es tipo de contenido texto plano
                break;
                case 'html':
                    response.writeHead(200, {"Content-Type": "text/html"}); // Regresa la pagina (guardada en data), la cual es tipo de contenido html
                break;
                case 'jpg':
                    response.writeHead(200, {"Content-Type": "image/jpeg"}); // Regresa la pagina (guardada en data), la cual es tipo de contenido html
                break;
            }
            response.write(data);
            response.end();
        }
    }) 
}).listen(4444); // Permite seleccionar un puerto al cual va a escuchar el servidor

// Cuando se corra, si vamos a localhost:4444, saldrá el contenidox