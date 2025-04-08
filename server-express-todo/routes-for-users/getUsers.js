const express = require('express');
const pool = require('../bd');
const getUsersRouter = express.Router();

//получить все записи
getUsersRouter.get('/users', async function (req, res) {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY user_id'); // DESC
    res.send(result.rows);
    return result.rows;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = getUsersRouter;
