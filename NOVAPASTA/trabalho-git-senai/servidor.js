const http = require("http"); // Importa o módulo HTTP para criar um servidor
const fs = require('fs'); // Importa o módulo fs para trabalhar com o sistema de arquivos (ler arquivos)

const host = 'localhost'; // Define o host do servidor (localhost para ambiente local)
const port = 8000; // Define a porta na qual o servidor irá escutar
const fileName = "index.html"; // Nome do arquivo HTML a ser servido

// Função que será chamada toda vez que o servidor receber uma requisição
const requestListener = function (req, res) {
    // Lê o arquivo HTML (index.html) usando o método de callback do fs
    fs.readFile(__dirname + "/" + fileName, (err, contents) => {
        if (err) {
            // Se ocorrer um erro ao ler o arquivo (por exemplo, o arquivo não existe)
            res.writeHead(500); // Envia um código de resposta HTTP 500 (erro do servidor)
            res.end("Error loading the HTML file"); // Envia uma mensagem de erro ao cliente
            console.error(err); // Exibe o erro no console do servidor para depuração
        }
        else{
            // Se a leitura do arquivo foi bem-sucedida
            res.setHeader("Content-Type", "text/html"); // Define o cabeçalho da resposta, indicando que o conteúdo é HTML
            res.writeHead(200); // Envia um código de resposta HTTP 200 (OK)
            res.end(contents); // Envia o conteúdo do arquivo HTML como resposta ao cliente
        }
    });
};

// Cria o servidor HTTP e define a função requestListener para tratar todas as requisições
const server = http.createServer(requestListener);

// Inicia o servidor, escutando na porta e host definidos
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`); // Exibe uma mensagem no console quando o servidor está no ar
});

