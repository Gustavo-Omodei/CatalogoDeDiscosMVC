const Artistas = require('../Models/Artistas'); // Verifique se o caminho está correto
const Discos = require('../Models/Discos');


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

        res.status(201).json(artista); // Respondendo com o artista criado
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar artista', details: error.message });
    }
};
  
  // Função para renderizar o formulário de cadastro de artista, com os discos disponíveis
  const renderFormArtista = async (req, res) => {
    try {
      const discos = await Discos.findAll(); // Pega todos os discos cadastrados
      res.render('artistas', { discos });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao carregar discos', details: error.message });
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
        const { nome, generoMusical } = req.body;
        
        const artista = await Artistas.findByPk(idArtista);

        if (!artista) {
            return res.status(404).json({ error: 'Artista não encontrado' });
        }

        artista.nome = nome || artista.nome;
        artista.generoMusical = generoMusical || artista.generoMusical;
        await artista.save();

        res.status(200).json(artista);
    } catch (error) {
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
    removerArtista,
    associarArtistaADiscos,
    renderFormArtista,
};
