import express from 'express';
import pool from '../db/database';
import { getUserByEmail, getUserPassword } from '../actions/readerAction';

const readerRouter = express.Router();

readerRouter.get('/users', async (req, res) => {
    try {
        const queryResult = await pool.query('SELECT * FROM READERS;');
        return res.status(200).json(queryResult[0]);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

readerRouter.post('/user/register', async (req, res) => {
    try {
        const { reader_name, reader_email, reader_password } = req.body;

        if (reader_name == '' || reader_email == '') {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const queryResult = await pool.query('INSERT INTO READERS(reader_name, reader_email, reader_password) VALUES(?, ?, ?)', [reader_name, reader_email, reader_password]);
        return res.status(200).json(queryResult[0]);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

readerRouter.post('/user/login', async (req, res) => {
    try {
        const { reader_email, reader_password } = req.body;

        if (reader_email == '' || reader_password == '') {
            return res.status(400).json({ error: 'Invalid credentials', requiredFields: "reader_email and reader_id" });
        }
        var user = await getUserByEmail(reader_email);

        // if (user[0].length < 1) {
        //     return res.status(400).json({ error: 'Staff does not exists' });
        // }
        res.cookie('lms', reader_password, { path: '/*', domain: 'localhost' });
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

export default readerRouter;