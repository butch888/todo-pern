const express = require('express');
const pool = require('../bd');

const isdoneTaskRouter = express.Router();

// отметить задачу выполненной по id
isdoneTaskRouter.post(
    '/taskUpdateIsdone/:id/:isdone',
    // eslint-disable-next-line consistent-return
    async (request, response) => {
        const { id, isdone } = request.params;
        try {
            const res = await pool.query(
                'UPDATE tasks SET isdone = $1 WHERE id = $2 RETURNING *',
                [isdone, id]
            );
            response.send(res.rows[0]);
            return res.rows[0];
        } catch (error) {
            console.error(error);
            response.status(500).send('Server error');
        }
    }
);

module.exports = isdoneTaskRouter;
