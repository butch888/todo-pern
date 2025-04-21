const express = require('express');
const pool = require('../bd');

const delUsersRouter = express.Router();

delUsersRouter.post('/users', async (request, response) => {
  try {
    await pool.query('DELETE FROM users RETURNING *');
    response.status(200).send({ message: 'Все пользователи удалены' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Ошибка при удалении пользователей' });
  }
});

module.exports = delUsersRouter;