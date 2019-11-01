const express = require('express');
const router = express.Router();
const StuffController = require('../controllers/stuff');

router.post('/', StuffController.createThing);
router.get('/:id', StuffController.getOneThing);
router.put('/:id', StuffController.modifyOneThing);
router.delete('/:id', StuffController.deleteOneThing);
router.use('/', StuffController.getAllThings);

module.exports = router;