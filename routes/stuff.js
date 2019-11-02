const express = require('express');
const router = express.Router();

const StuffController = require('../controllers/stuff');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, StuffController.createThing);
router.get('/:id', auth, StuffController.getOneThing);
router.put('/:id', auth, multer, StuffController.modifyOneThing);
router.delete('/:id', auth, StuffController.deleteOneThing);
router.get('/', auth, StuffController.getAllThings);

module.exports = router;