import express from 'express';
import pool from '../db/database';
import { getStaffById } from '../actions/staffAction';

const router = express.Router();

router.get('/staffs', async (req, res) => {
    try {
        const queryResult = await pool.query('SELECT * FROM STAFFS;');
        return res.status(200).json(queryResult[0]);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

router.post('/staff/register', async (req, res) => {
    try {
        const { staff_name, staff_password } = req.body;

        if (staff_name == '' || staff_password == '') {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const queryResult = await pool.query('INSERT INTO STAFFS(staff_name, staff_password) VALUES(?, ?, ?)', [staff_name, staff_password]);
        return res.status(200).json(queryResult[0]);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

router.post('/staff/login', async (req, res) => {
    try {
        const { staff_id, staff_password } = req.body;

        if (staff_id == null || staff_password == null) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        var staff = await getStaffById(staff_id);

        if (staff[0].length < 1) {
            return res.status(400).json({ error: 'Staff does not exists' });
        }

        res.cookie('lms-staff', staff_password, { path: '/*', domain: 'localhost' })
        return res.status(200).json(staff);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

export default router;