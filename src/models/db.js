const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
host: 'localhost', // ou o IP do seu servidor de banco de dados
user: 'root', // nome de usuário do banco de dados
password: '', // senha do banco de dados (preencha caso tenha)
database: 'projeto' // nome do banco de dados 
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err); 
        throw err;
}
console.log('Conectado ao banco de dados MySQL'); 
});

module.exports = db;