const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

exports.getCrypto = async (pageSize, page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/markets?x_cg_demo_api_key=${API_KEY}`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: pageSize,
        page,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    // Create an error object with details
    const errorDetails = {
      message: error.message,
      status: error.response ? error.response.status : null,
      data: error.response ? error.response.data : null,
    };
    throw errorDetails; // Propagate the error details
  }
};

exports.getCurrency = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/simple/supported_vs_currencies?x_cg_demo_api_key=${API_KEY}`);
    return response.data.map(currency => ({ name: currency.toUpperCase(), key: currency }));
  } catch (error) {
    // Create an error object with details
    const errorDetails = {
      message: error.message,
      status: error.response ? error.response.status : null,
      data: error.response ? error.response.data : null,
    };
    throw errorDetails; // Propagate the error details
  }
};

exports.convertCurrency = async (sourceCrypto, amount, targetCurrency) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/simple/price?x_cg_demo_api_key=${API_KEY}`, {
      params: {
        ids: sourceCrypto,
        vs_currencies: targetCurrency,
      },
    });

    const exchangeRate = response.data[sourceCrypto][targetCurrency];
    const convertedAmount = amount * exchangeRate;
    return {  convertedAmount, exchangeRate };
  } catch (error) {
    // Create an error object with details
    const errorDetails = {
      message: error.message,
      status: error.response ? error.response.status : null,
      data: error.response ? error.response.data : null,
    };
    throw errorDetails; // Propagate the error details
  }
};
