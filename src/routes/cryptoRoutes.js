const express = require('express');
const cryptoController = require('../controllers/cryptoController');

const router = express.Router();

router.get('/cryptos', cryptoController.getCrypto);
router.get('/currency', cryptoController.getCurrency);
router.post('/convert', cryptoController.convertCurrency);

module.exports = router;
