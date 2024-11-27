const express = require('express');
const router = express.Router();
const discoController = require('../Controllers/discoController');
const faixasController = require('../Controllers/faixaController');
const artistasController = require('../Controllers/artistaController');
const generoController = require('../Controllers/generoController');
const Genero = require('../Models/Genero')
const Discos = require('../Models/Discos')
const Artistas = require('../Models/Artistas')


//Discos
router.get('/', discoController.listarDiscos);
router.post('/discos', discoController.criarDisco);


router.get('/discos/:id', discoController.atualizarDisco);
router.put('/discos/:id', discoController.atualizarDisco);
router.delete('/discos/deletar/:id', (req, res, next) => {
  console.log("Requisição DELETE recebida para ID:", req.params.id);
  next(); 
}, discoController.deletarDisco);


router.get('/discos', async (req, res) => {
  try {
      const generos = await Genero.findAll();

      res.render('discos', { disco: null, generos });
  } catch (error) {
      console.error('Erro ao carregar os gêneros:', error);
      res.status(500).json({ error: 'Erro ao carregar os gêneros', details: error.message });
  }
});

//Generos
  router.get('/generos', async (req, res) => {
    try {
        const generos = await Genero.findAll(); // Recuperar todos os gêneros

        res.render('generos', { generos }); // Passa a lista de gêneros para o template EJS
    } catch (error) {
        console.error('Erro ao carregar os gêneros:', error);
        res.status(500).json({ error: 'Erro ao carregar os gêneros', details: error.message });
    }
  });

  router.post('/generos', generoController.criarGenero);

  router.put('/generos/:id', generoController.atualizarGenero);

  router.delete('/generos/:id', generoController.deletarGenero);

//Artistas

router.get('/artistas/novo', artistasController.renderFormArtista);

router.get('/artistas', artistasController.listarArtistas); // Controlador de listagem

router.get('/artistas', async (req, res) => {
  try {
    const discos = await Discos.findAll(); // Carrega todos os discos do banco
    res.render('artistas', { discos }); // Passa discos para o EJS
  } catch (error) {
    console.error('Erro ao carregar discos:', error);
    res.status(500).json({ error: 'Erro ao carregar discos', details: error.message });
  }
});

router.post('/artistas', async (req, res) => {

  try {
    const { nome, idGenero, discos } = req.body; 

    const artista = await Artistas.create({
      nome,
      idGenero,
    });

    if (discos && discos.length > 0) {
      const discosExistentes = await Discos.findAll({
        where: {
          idDisco: discos, 
        },
      });
      await artista.setDiscos(discosExistentes); 
    }

    // res.status(201).json(artista); // Respondendo com o artista criado
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar artista', details: error.message });
  }
});


router.get('/artistas/:idArtista', artistasController.buscarArtistaPorId);
router.put('/artistas/:idArtista', artistasController.editarArtista);
router.delete('/artistas/:idArtista', artistasController.removerArtista);
router.put('/artistas/:idArtista/discos', artistasController.associarArtistaADiscos);

module.exports = router;
