const Genero = require('../Models/Genero');
const { Op } = require('sequelize');

// Listar Gêneros com busca
const listarGeneros = async (req, res) => {
    try {
        // Buscar todos os gêneros sem filtro de busca
        const generos = await Genero.findAll();

        // Renderizar a página de gêneros com a lista
        res.render('generos', { generos });
    } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
        res.status(500).json({ error: 'Erro ao carregar gêneros' });
    }
};


// Criar Gênero
const criarGenero = async (req, res) => {
    try {
        const { nome } = req.body;

        const novoGenero = await Genero.create({
            nome
        });

        res.redirect(`/generos/${novoGenero.idGenero}`); // Redireciona para a página do novo gênero
    } catch (error) {
        console.error('Erro ao criar gênero:', error);
        res.status(500).json({ error: 'Erro ao criar gênero', details: error.message });
    }
};

// Atualizar Gênero
const atualizarGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome } = req.body;

        const genero = await Genero.findOne({
            where: { idGenero: id }
        });

        if (!genero) {
            return res.status(404).json({ error: 'Gênero não encontrado' });
        }

        genero.nome = nome;
        await genero.save();

        await genero.update({ nome });
        return res.status(200).json({ success: true, genero });


        // res.render('generos', { genero }); 
    } catch (error) {
        console.error('Erro ao atualizar gênero:', error);
        res.status(500).json({ error: error.message });
    }
};

// Deletar Gênero
const deletarGenero = async (req, res) => {
    const { id } = req.params;

    try {
        const genero = await Genero.findOne({
            where: { idGenero: id }
        });

        if (!genero) {
            return res.status(404).json({ error: 'Gênero não encontrado' });
        }

        await genero.destroy();

        res.json({ message: 'Gênero deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar o gênero' });
    }
};

module.exports = {
    listarGeneros,
    criarGenero,
    deletarGenero,
    atualizarGenero
};
