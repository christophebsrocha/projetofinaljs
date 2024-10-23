const express = require('express'); 
const session = require('express-session'); 
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./src/routes/index'); // Arquivo de rotas

const app = express(); 

app.use(express.json());

// Configurando a sessão 
app.use(session({ 
    secret: 'mySecretKey',
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false } // True somente se HTTPS
})); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar o motor de template (ejs neste caso)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Rotas 
app.use('/', routes); 

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
 });