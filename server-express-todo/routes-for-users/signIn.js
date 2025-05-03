const express = require('express');
const pool = require('../bd');
const bcrypt = require('bcryptjs');

const signInRouter = express.Router();

signInRouter.post('/signIn/:user_name/:pass', async (request, response) => {
  const { user_name, pass } = request.params;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE user_name = $1', 
      [user_name]);
    
    if (result.rows.length === 0) {
      response.json({ message: `Пользователь ${user_name} не найден` }); // Проверка существует ли такой пользователь
      return;
    }
    
    const hash = result.rows[0].pass
    const isValid = await bcrypt.compare(pass, hash);

    // Проверка пароля, если верный передаем данные
    if (!isValid) {
      response.json({ message: 'Неверный пароль' });
      return;
    } else {
      response.json({
        isValid: isValid,
        userData: {
          user_id: result.rows[0].user_id,
          user_name: result.rows[0].user_name
        }
      });
    }

  } catch (error) {
    console.error('Error checking username:', error);
    response.status(500).json({ message: 'Internal server error' })
  } finally {
    console.log('finally')
  }
});

module.exports = signInRouter;