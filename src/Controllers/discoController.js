const Discos = require('../Models/Discos');
const Artistas = require('../Models/Artistas');
const Genero = require('../Models/Genero');
const Faixas = require('../Models/Faixas');

const listarDiscos = async (req, res) => {
    try {
        const discos = await Discos.findAll();
            // include: [{ model: Genero, as: 'genero' }]  // Inclui a tabela de gênero, caso seja necessário
        res.render('index', { discos });  // Passa a variável discos para a view
    } catch (error) {
        console.error('Erro ao carregar discos:', error);
        res.status(500).json({ error: 'Erro ao carregar discos' });
    }
};

const criarDisco = async (req, res) => {
    try {
        const { titulo, anoLancamento, capaImagem, faixas } = req.body;

        // Cria o disco no banco de dados
        const novoDisco = await Discos.create({
            titulo,
            anoLancamento,
            capaImagem,
        });

        // Verifica se existem faixas e as adiciona
        if (faixas && Array.isArray(faixas)) {
            const faixasFormatadas = faixas.map((faixa) => ({
                titulo: faixa.titulo,
                idDisco: novoDisco.idDisco,
                idGenero: faixa.idGenero, // Gênero da faixa
            }));

            // Cria todas as faixas vinculadas ao disco
            await Faixas.bulkCreate(faixasFormatadas);
        }

        res.status(201).json({ message: 'Disco criado com sucesso!', disco: novoDisco });
    } catch (error) {
        console.error('Erro ao criar disco:', error);
        res.status(500).json({ error: 'Erro ao criar disco', details: error.message });
    }
};

const atualizarDisco = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, ano } = req.body;

        const disco = await Discos.findByPk(id);
        if (!disco) return res.status(404).json({ error: 'Disco não encontrado' });

        await disco.update({ titulo, ano });
        res.json(disco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletarDisco = async (req, res) => {
    try {
        const { id } = req.params;
        const disco = await Discos.findByPk(id);
        if (!disco) return res.status(404).json({ error: 'Disco não encontrado' });

        await disco.destroy();
        res.json({ message: 'Disco deletado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarDiscos,
    criarDisco,
    deletarDisco,
    atualizarDisco,

}

