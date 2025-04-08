const express = require('express');
const pool = require('../bd');

const editTaskRouter = express.Router();

// редактировать текст задачи по id
editTaskRouter.post('/editTask/:id/:task', async (request, response) => {
    const { id, task } = request.params;
    try {
        const res = await pool.query(
            'UPDATE tasks SET task = $1 WHERE id = $2 RETURNING *',
            [task, id]
        );
        response.send(res.rows);
        return res.rows[0];
    } catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

module.exports = editTaskRouter;
