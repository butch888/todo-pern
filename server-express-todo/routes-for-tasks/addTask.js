const express = require('express');
const pool = require('../bd');

const addTasksRouter = express.Router();

//добавить задачу
addTasksRouter.post('/addTask/:id/:task/:isdone', async (request, response) => {
  const {id, task, isdone } = request.params;
  try {
      const res = await pool.query(
        'INSERT INTO tasks (id, task, isdone) VALUES ($1, $2, $3) RETURNING *', 
        [id, task, isdone]
      );
      response.send(res.rows);
      return res.rows;
  } catch (error) {
      console.error(error);
      response.status(500).send('Server error');
  }
});

module.exports = addTasksRouter;