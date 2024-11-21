const express = require('express');
const router = express.Router();
const diskController = require('../controllers/diskController');

router.get('/', diskController.listDisks);
router.post('/', diskController.createDisk);
router.put('/:id', diskController.updateDisk);
router.delete('/:id', diskController.deleteDisk);

module.exports = router;
