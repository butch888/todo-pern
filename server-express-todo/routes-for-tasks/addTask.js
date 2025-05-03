const express = require('express');
const pool = require('../bd');

const addTasksRouter = express.Router();

//добавить задачу
addTasksRouter.post('/addTask/:id/:task/:isdone/:user_id', async (request, response) => {
  const {id, task, isdone,user_id } = request.params;
  try {
      const res = await pool.query(
        'INSERT INTO tasks (id, task, isdone, user_id) VALUES ($1, $2, $3, $4) RETURNING *', 
        [id, task, isdone, user_id]
      );
      response.send(res.rows);
      return res.rows;
  } catch (error) {
      console.error(error);
      response.status(500).send('Server error');
  }
});

module.exports = addTasksRouter;