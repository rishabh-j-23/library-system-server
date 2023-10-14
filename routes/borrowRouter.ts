import express from 'express';
import pool from '../db/database';

const router = express.Router();



router.get('/books/borrowed', async (req, res) => {
    const allBorrowedBooks: any = await pool.query('SELECT * FROM Borrow');
    return res.status(200).json(allBorrowedBooks[0]);
});

router.post('/books/borrow/add', async (req, res) => {
    try {
        const { reader_id, book_id } = req.body;

        var currentDate = new Date();
        var returnDate = new Date();
        returnDate.setDate(currentDate.getDate() + 30);

        if (reader_id == null || book_id == null) {
            return res.status(200).json({ error: 'Invalid Parameters' });
        }
        if (reader_id == '' || book_id == '') {
            return res.status(200).json({ error: 'Invalid Parameters' });
        }

        const borrowEntry: any = await pool.query('INSERT INTO Borrow(reader_id, book_id, borrowed_date, return_date) VALUES(?, ?, ?, ?)',
            [reader_id, book_id, currentDate.toISOString(), returnDate.toISOString()]
        );

        return res.status(200).json(borrowEntry[0]);
    } catch (error) {
        return res.status(200).json({ error });
    }
});

router.post('/books/borrow/remove', async (req, res) => {
    try {
        const { reader_id, book_id } = req.body;

        if (reader_id == null || book_id == null) {
            return res.status(200).json({ error: 'Invalid Parameters' });
        }
        if (reader_id == '' || book_id == '') {
            return res.status(200).json({ error: 'Invalid Parameters' });
        }

        const deletedEntry: any = await pool.query('DELETE FROM BORROW WHERE reader_id=? AND book_id=?',
            [reader_id, book_id]
        );

        return res.status(200).json(deletedEntry[0]);
    } catch (error) {
        return res.status(200).json({ error });
    }
});

export default router;