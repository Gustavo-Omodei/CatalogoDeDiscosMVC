require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./src/Models'); 
const diskRoutes = require('./src/routes/diskRoutes'); 

const discoController = require('./src/Controllers/discoController');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'Views')); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('src/Views'));


app.get('/', discoController.listarDiscos);

app.use(bodyParser.json());

app.use(diskRoutes);

const PORT = process.env.PORT || 3000;

sequelize
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida.');
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    });