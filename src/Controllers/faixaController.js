const { Faixas } = require('../Models'); // Ajuste conforme o caminho real da model Faixas

// Criar uma nova faixa
const createFaixa = async (req, res) => {
    try {
        const { titulo, Genero } = req.body;
        console.log('Dados recebidos:', { titulo, Genero }); // Imprime os dados recebidos
        const novaFaixa = await Faixas.create({ titulo, Genero });
        return res.status(201).json(novaFaixa);
    } catch (error) {
        console.error('Erro ao criar faixa:', error.message);
        return res.status(500).json({ error: 'Erro ao criar faixa', details: error.message });
    }
};


// Listar todas as faixas
const getFaixas = async (req, res) => {
    try {
        const faixas = await Faixas.findAll(); // Pega todas as faixas do banco de dados
        return res.status(200).json(faixas); // Retorna as faixas com status 200
    } catch (error) {
        console.error('Erro ao buscar faixas:', error);
        return res.status(500).json({ error: 'Erro ao buscar faixas' });
    }
};

// Buscar uma faixa específica por ID
const getFaixaById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const faixa = await Faixas.findByPk(id); // Busca a faixa pelo ID

        if (!faixa) {
            return res.status(404).json({ message: 'Faixa não encontrada' });
        }

        return res.status(200).json(faixa); // Retorna a faixa com status 200
    } catch (error) {
        console.error('Erro ao buscar faixa:', error);
        return res.status(500).json({ error: 'Erro ao buscar faixa' });
    }
};

// Atualizar uma faixa
const updateFaixa = async (req, res) => {
    const { id } = req.params;
    const { titulo, Genero, idDisco } = req.body;

    try {
        const faixa = await Faixas.findByPk(id); // Busca a faixa pelo ID

        if (!faixa) {
            return res.status(404).json({ message: 'Faixa não encontrada' });
        }

        // Atualiza a faixa no banco de dados
        faixa.titulo = titulo || faixa.titulo;
        faixa.Genero = Genero || faixa.Genero;
        faixa.idDisco = idDisco || faixa.idDisco;
        
        await faixa.save(); // Salva as mudanças

        return res.status(200).json(faixa); // Retorna a faixa atualizada
    } catch (error) {
        console.error('Erro ao atualizar faixa:', error);
        return res.status(500).json({ error: 'Erro ao atualizar faixa' });
    }
};

// Deletar uma faixa
const deleteFaixa = async (req, res) => {
    const { id } = req.params;

    try {
        const faixa = await Faixas.findByPk(id); // Busca a faixa pelo ID

        if (!faixa) {
            return res.status(404).json({ message: 'Faixa não encontrada' });
        }

        await faixa.destroy(); // Deleta a faixa

        return res.status(200).json({ message: 'Faixa deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar faixa:', error);
        return res.status(500).json({ error: 'Erro ao deletar faixa' });
    }
};

module.exports = {
    createFaixa,
    getFaixas,
    getFaixaById,
    updateFaixa,
    deleteFaixa,
};
