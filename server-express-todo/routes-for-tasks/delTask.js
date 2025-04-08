const express = require('express');
const pool = require('../bd');

const delTaskRouter = express.Router();

// удалить задачу по id
// eslint-disable-next-line consistent-return
delTaskRouter.post('/delTask/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const res = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *',
            [id]
        );
        response.send(res.rows);
        return res.rows;
    } catch (error) {
        console.error(error);
        response.status(500).send('Server error');
    }
});

module.exports = delTaskRouter;
