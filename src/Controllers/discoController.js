const Discos = require('../Models/Discos');
const Artistas = require('../Models/Artistas');
const Genero = require('../Models/Genero');
const Faixas = require('../Models/Faixas');

const { Op } = require('sequelize');

// const listarDiscos = async (req, res) => {
//     try {
//         const { tipoBusca, nomeDisco, nomeArtista } = req.query;

//         // Filtros condicionais
//         const whereConditions = {};
//         const include = [];

//         if (tipoBusca === 'disco') {
//             whereConditions.titulo = {
//                 [Op.iLike]: `%${nomeDisco}%`
//             };
//         }

//         if (tipoBusca === 'artista') {
//             include.push({
//                 model: Artistas,
//                 as: 'Artistas', // Aqui você confirma o alias
//                 where: {
//                     nome: {
//                         [Op.iLike]: `%${nomeArtista}%`
//                     }
//                 }
//             });
//         } else {
//             include.push({
//                 model: Artistas,
//                 as: 'Artistas'
//             });
//         }

//         const discos = await Discos.findAll({
//             include,
//             where: whereConditions
//         });

//         res.render('index', { discos, nomeDisco, nomeArtista });
//     } catch (error) {
//         console.error('Erro ao carregar discos:', error);
//         res.status(500).json({ error: 'Erro ao carregar discos' });
//     }
// };

const listarDiscos = async (req, res) => {
    try {
        const { tipoBusca, termoBusca } = req.query;

        // Filtros condicionais
        const whereConditions = {};
        const include = [];

        if (tipoBusca === 'disco') {
            // Busca pelo título do disco
            whereConditions.titulo = {
                [Op.iLike]: `%${termoBusca}%` // Ignora maiúsculas/minúsculas
            };
        } else if (tipoBusca === 'artista') {
            // Busca pelo nome do artista
            include.push({
                model: Artistas,
                as: 'Artistas',
                where: {
                    nome: {
                        [Op.iLike]: `%${termoBusca}%` // Ignora maiúsculas/minúsculas
                    }
                }
            });
        } else {
            // Caso não seja especificado um tipo válido, inclua artistas por padrão
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
        const { titulo, anoLancamento, capaImagem, faixas } = req.body;

        const novoDisco = await Discos.create({
            titulo,
            anoLancamento,
            capaImagem,
        });

        if (faixas && Array.isArray(faixas)) {
            const faixasFormatadas = faixas.map((faixa) => ({
                titulo: faixa.titulo,
                idDisco: novoDisco.idDisco,
                idGenero: faixa.idGenero, // Gênero da faixa
            }));

            await Faixas.bulkCreate(faixasFormatadas);
        }

        // res.status(201).json({ message: 'Disco criado com sucesso!', disco: novoDisco });
    } catch (error) {
        console.error('Erro ao criar disco:', error);
        res.status(500).json({ error: 'Erro ao criar disco', details: error.message });
    }
};

// const atualizarDisco = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { titulo, ano } = req.body;

//         const disco = await Discos.findByPk(id);
//         if (!disco) return res.status(404).json({ error: 'Disco não encontrado' });

//         await disco.update({ titulo, ano });
//         res.render('detalhes', { disco });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const atualizarDisco = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, anoLancamento, capaImagem } = req.body;

        // Buscar o disco junto com os artistas e faixas
        const disco = await Discos.findByPk(id, {
            include: [
                {
                    model: Faixas, // Incluindo faixas vinculadas ao disco
                    as: 'faixas', // Usando o alias 'faixas' definido na associação
                },
                {
                    model: Artistas, // Incluindo artistas vinculados ao disco
                    as: 'Artistas', // Usando o alias 'Artistas' definido na associação
                }
            ],
        });

        if (!disco) {
            return res.status(404).json({ error: 'Disco não encontrado' });
        }

        // Atualizar os dados do disco
        await disco.update({ titulo, anoLancamento, capaImagem });

        // Renderizar a página de detalhes com o disco, faixas e artistas
        res.render('detalhes', { disco, faixas: disco.faixas, artistas: disco.Artistas });
    } catch (error) {
        console.error('Erro ao atualizar disco:', error);
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

