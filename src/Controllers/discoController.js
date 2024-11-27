const Discos = require('../Models/Discos');
const Artistas = require('../Models/Artistas');
const Genero = require('../Models/Genero');
const Faixas = require('../Models/Faixas');

const { Op } = require('sequelize');

const listarDiscos = async (req, res) => {
    try {
        const { tipoBusca, termoBusca } = req.query;

        const whereConditions = {};
        const include = [];

        if (tipoBusca === 'disco') {
            whereConditions.titulo = {
                [Op.iLike]: `%${termoBusca}%` 
            };
        } else if (tipoBusca === 'artista') {
            include.push({
                model: Artistas,
                as: 'Artistas',
                where: {
                    nome: {
                        [Op.iLike]: `%${termoBusca}%`
                    }
                }
            });
        } else if (tipoBusca === 'genero') {
            include.push({
                model: Genero,
                as: 'genero',
                where: {
                    nome: {
                        [Op.iLike]: `%${termoBusca}%`
                    }
                }
            });
        } else {
            include.push({
                model: Artistas,
                as: 'Artistas'
            });
        }

        const discos = await Discos.findAll({
            include,
            where: whereConditions
        });

        res.render('index', { discos, tipoBusca, termoBusca });
    } catch (error) {
        console.error('Erro ao carregar discos:', error);
        res.status(500).json({ error: 'Erro ao carregar discos' });
    }
};



const criarDisco = async (req, res) => {
    try {
        const { titulo, anoLancamento, capaImagem, faixas, idgenero  } = req.body;

        const novoDisco = await Discos.create({
            titulo,
            anoLancamento,
            capaImagem,
            idgenero,
        });

        if (faixas && Array.isArray(faixas)) {
            const faixasFormatadas = faixas.map((faixa) => ({
                titulo: faixa.titulo,
                idDisco: novoDisco.idDisco,
                idGenero: faixa.idGenero, 
            }));

            await Faixas.bulkCreate(faixasFormatadas);
        }

        res.redirect(`/discos/${novoDisco.idDisco}`);

    } catch (error) {
        console.error('Erro ao criar disco:', error);
        res.status(500).json({ error: 'Erro ao criar disco', details: error.message });
    }
};


const atualizarDisco = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, anoLancamento, capaImagem } = req.body;

        const disco = await Discos.findOne({
            where: {idDisco: id},
            include: [
                {
                    model: Faixas, 
                    as: 'faixas', 
                },
                {
                    model: Artistas, 
                    as: 'Artistas', 
                },
                {
                    model: Genero,
                    as: 'genero'
                }
                
            ],
        });

        if (!disco) {
            return res.status(404).json({ error: 'Disco não encontrado' });
        }

        await disco.update({ titulo, anoLancamento, capaImagem });

        res.render('detalhes', { disco, faixas: disco.faixas, artistas: disco.Artistas });
    } catch (error) {
        console.error('Erro ao atualizar disco:', error);
        res.status(500).json({ error: error.message });
    }
};


const deletarDisco = async (req, res) => {
    const { id } = req.params; 


    try {


        const disco = await Discos.findOne({
            where: { idDisco: id }  
        });


        if (!disco) {
            return res.status(404).json({ error: 'Disco não encontrado' });
        }

        await disco.destroy();

        res.json({ message: 'Disco deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar o disco' });
    }
};

module.exports = {
    listarDiscos,
    criarDisco,
    deletarDisco,
    atualizarDisco,

}

