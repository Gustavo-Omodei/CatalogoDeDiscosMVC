const express = require('express');
const router = express.Router();
const discoController = require('../Controllers/discoController');
const faixasController = require('../Controllers/faixaController');
const artistasController = require('../Controllers/artistaController');
const Genero = require('../Models/Genero')
const Discos = require('../Models/Discos')
const Artistas = require('../Models/Artistas')


//Discos
router.get('/', discoController.listarDiscos);
router.post('/discos', discoController.criarDisco);

router.get('/discos/:id', discoController.atualizarDisco);
router.put('/discos/:id', discoController.atualizarDisco);
router.delete('/:id', discoController.deletarDisco);

router.get('/discos', async (req, res) => {
  try {
      const generos = await Genero.findAll();

      res.render('discos', { generos });
  } catch (error) {
      console.error('Erro ao carregar os gêneros:', error);
      res.status(500).json({ error: 'Erro ao carregar os gêneros', details: error.message });
  }
});

//Faixas
router.post('/faixas', faixasController.createFaixa);

router.get('/faixas', (req, res) => {
  res.render('faixas'); 
});
router.get('/faixas/:id', faixasController.getFaixaById);
router.put('/faixas/:id', faixasController.updateFaixa);
router.delete('/faixas/:id', faixasController.deleteFaixa);

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
    const { nome, idGenero, discos } = req.body; // Pegando os valores enviados no formulário

    const artista = await Artistas.create({
      nome,
      idGenero, // Certifique-se de que o idGenero seja passado corretamente
    });

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
});


router.get('/artistas/:idArtista', artistasController.buscarArtistaPorId);
router.put('/artistas/:idArtista', artistasController.editarArtista);
router.delete('/artistas/:idArtista', artistasController.removerArtista);
router.put('/artistas/:idArtista/discos', artistasController.associarArtistaADiscos);

module.exports = router;
