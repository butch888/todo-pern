const express = require('express');
const pool = require('../bd');
const getTasksRouter = express.Router();

//получить все записи
getTasksRouter.get('/:user_id', async function (req, res) {
  const { user_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY id',
      [user_id]
    ); // DESC
    res.send(result.rows);
    return result.rows;
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = getTasksRouter;
