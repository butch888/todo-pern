const express = require('express');
const pool = require('../bd');
const bcrypt = require('bcryptjs');

const signInRouter = express.Router();

signInRouter.post('/signIn/:user_name/:pass', async (request, response) => {
  const { user_name, pass } = request.params;
  try {
    console.log('formData:', user_name, pass)

    const result = await pool.query('SELECT * FROM users WHERE user_name = $1', [user_name]);
    const hash = result.rows[0].pass
    console.log('hash:', hash)

    const isValid = await bcrypt.compare(pass, hash);
    console.log('isValid: ', isValid)

  } catch (error) {
    console.error('Error checking username:', error);
    throw error;
  }
})


module.exports = signInRouter;