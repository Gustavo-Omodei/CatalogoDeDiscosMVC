const Artistas = require('../Models/Artistas'); // Verifique se o caminho está correto
const Discos = require('../Models/Discos');


// Atualizar Artista
// const atualizarArtista = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { nome, idGenero } = req.body;

//         const artista = await Artista.findOne({ where: { idArtista: id } });

//         if (!artista) {
//             return res.status(404).json({ success: false, message: 'Artista não encontrado' });
//         }

//         await artista.update({ nome, idGenero });

//         res.json({ success: true, artista });
//     } catch (error) {
//         console.error('Erro ao atualizar artista:', error);
//         res.status(500).json({ success: false, message: 'Erro ao atualizar artista' });
//     }
// };

// Deletar Artista
const deletarArtista = async (req, res) => {
    const { id } = req.params;

    try {
        const artista = await Artista.findOne({ where: { idArtista: id } });

        if (!artista) {
            return res.status(404).json({ success: false, message: 'Artista não encontrado' });
        }

        await artista.destroy();

        res.json({ success: true, message: 'Artista deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar artista:', error);
        res.status(500).json({ success: false, message: 'Erro ao deletar artista' });
    }
};


const criarArtista = async (req, res) => {
    try {
        const { nome, idGenero, discos } = req.body; // Pegando os valores enviados no formulário

        // Criando o novo artista
        const artista = await Artistas.create({
            nome,
            idGenero, // Certifique-se de que o idGenero seja passado corretamente
        });

        // Associando os discos ao artista
        if (discos && discos.length > 0) {
            const discosExistentes = await Discos.findAll({
                where: {
                    idDisco: discos, // Aqui você vai buscar os discos pelos IDs
                },
            });
            await artista.setDiscos(discosExistentes); // Associando discos ao artista
        }

        // res.status(201).json(artista); // Respondendo com o artista criado
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar artista', details: error.message });
    }
};
  
  // Função para renderizar o formulário de cadastro de artista, com os discos disponíveis
  const renderFormArtista = async (req, res) => {
    try {
        const discos = await Discos.findAll(); // Pega todos os discos cadastrados
        const artistas = await Artistas.findAll(); // Pega todos os artistas cadastrados
        res.render('criarArtistas', { discos, artistas }); // Passa discos e artistas para o EJS
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        res.status(500).json({ error: 'Erro ao carregar dados', details: error.message });
    }
};


// Listar todos os artistas
const listarArtistas = async (req, res) => {
    try {
        const artistas = await Artistas.findAll();
        res.status(200).json(artistas);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao listar artistas', details: error.message });
    }
};

// Buscar artista por ID
const buscarArtistaPorId = async (req, res) => {
    try {
        const { idArtista } = req.params;
        const artista = await Artistas.findByPk(idArtista);

        if (!artista) {
            return res.status(404).json({ error: 'Artista não encontrado' });
        }

        res.status(200).json(artista);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao buscar artista', details: error.message });
    }
};

// Editar artista
const editarArtista = async (req, res) => {
    try {
        const { idArtista } = req.params;
        const { nome, idGenero } = req.body;

        // Busca o artista
        const artista = await Artistas.findByPk(idArtista);

        if (!artista) {
            return res.status(404).json({ error: 'Artista não encontrado' });
        }

        // Atualiza o artista explicitamente
        await Artistas.update(
            { nome, idGenero }, // Campos a serem atualizados
            { where: { idArtista } } // Condição
        );

        // Responde com sucesso
        res.status(200).json({ success: true, message: 'Artista atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao editar artista:', error);
        res.status(400).json({ error: 'Erro ao editar artista', details: error.message });
    }
};


// Remover artista
const removerArtista = async (req, res) => {
    try {
        const { idArtista } = req.params;
        const artista = await Artistas.findByPk(idArtista);

        if (!artista) {
            return res.status(404).json({ error: 'Artista não encontrado' });
        }

        await artista.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: 'Erro ao remover artista', details: error.message });
    }
};

// Associar artista a discos
const associarArtistaADiscos = async (req, res) => {
    try {
        const { idArtista } = req.params;
        const { discos } = req.body;

        const artista = await Artistas.findByPk(idArtista);

        if (!artista) {
            return res.status(404).json({ error: 'Artista não encontrado' });
        }

        // Verifica se os discos existem
        const discosAssociados = await Discos.findAll({
            where: { idDisco: discos }
        });

        if (discosAssociados.length !== discos.length) {
            return res.status(400).json({ error: 'Alguns discos não foram encontrados' });
        }

        await artista.setDiscos(discosAssociados); // Associa os discos ao artista
        res.status(200).json({ message: 'Artista associado aos discos com sucesso' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao associar artista aos discos', details: error.message });
    }
};

module.exports = {
    criarArtista,
    listarArtistas,
    buscarArtistaPorId,
    editarArtista,
    // atualizarArtista,
    removerArtista,
    associarArtistaADiscos,
    renderFormArtista,
};
