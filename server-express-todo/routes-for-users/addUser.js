const express = require('express');
const pool = require('../bd');
const bcrypt = require('bcryptjs');

const addUserRouter = express.Router();

// Функция для асинхронного хеширования пароля
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash)
    return hash;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Проверяем наличие пользователя по user_name
async function checkUserNameExists(user_name) {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM users WHERE user_name = $1', [user_name]);
    return result.rows[0].count > 0;
  } catch (error) {
    console.error('Error checking username:', error);
    throw error;
  }
}

//добавить юзера
addUserRouter.post('/addUser/:user_id/:user_name/:pass', async (request, response) => {
  const { user_id, user_name, pass } = request.params;
  console.log('FORM_DATA:######### ', user_name, pass)
  try {
    // Сначала проверяем, существует ли пользователь с таким именем
    if (await checkUserNameExists(user_name)) {
      response.json({ message: 'Пользователь с таким именем уже существует' });
      return;
    }

    // Если пользователя нет, хешируем пароль
    const hashedPass = await hashPassword(pass);
    console.log ('Hash:', hashedPass);

    // Теперь безопасно вставляем данные в базу данных с хешированным паролем
    const res = await pool.query(
      'INSERT INTO users (user_id, user_name, pass) VALUES ($1, $2, $3) RETURNING *',
      [user_id, user_name, hashedPass]
    );

    // Проверяем, что пользователь был успешно добавлен
    if (res.rows.length === 1) {
      response.json({
        message: `Пользователь ${user_name} успешно добавлен`,
        userData: res.rows[0]
      });
    } else {
      response.status(500).json({ message: 'Не удалось добавить пользователя' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Ошибка сервера при добавлении пользователя' });
  }
});


module.exports = addUserRouter;