const cryptoService = require('../services/cryptoService');

exports.getCrypto = async (req, res) => {
  try {
    const { pageSize = 1, page = 1 } = req.query;
    const topCrypto = await cryptoService.getCrypto(pageSize, page);
    res.json(topCrypto);
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || 'Internal Server Error';
    const status = error.status || 500;
    const data = error.data || null;
    res.status(status).json({ error: errorMessage, data });
  }
};

exports.getCurrency = async (req, res) => {
  try {
    const supportedCurrency = await cryptoService.getCurrency();
    res.json(supportedCurrency);
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || 'Internal Server Error';
    const status = error.status || 500;
    const data = error.data || null;
    res.status(status).json({ error: errorMessage, data });
  }
};

exports.convertCurrency = async (req, res) => {
  try {
    const { sourceCrypto, amount, targetCurrency } = req.body;
    const result = await cryptoService.convertCurrency(sourceCrypto, amount, targetCurrency);
    res.json(result);
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || 'Internal Server Error';
    const status = error.status || 500;
    const data = error.data || null;
    res.status(status).json({ error: errorMessage, data });
  }
};
