require('dotenv').config(); // Para usar variáveis de ambiente
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./src/Models/index'); // Importa o Sequelize configurado
const diskRoutes = require('./src/routes/diskRoutes'); // Importa as rotas

const app = express();

app.get('/', (req, res) => {
    res.send('Bem-vindo ao catálogo de discos!');
});

// Middlewares
app.use(bodyParser.json()); // Para lidar com JSON no corpo das requisições

// Rotas
app.use('/disks', diskRoutes); // Exemplo de rota para discos

// Porta de execução
const PORT = process.env.PORT || 3000;

// Conecta ao banco e inicia o servidor
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados bem-sucedida.');
        app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    });
