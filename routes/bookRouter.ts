import express from 'express';
import pool from '../db/database'
import { getBookById } from '../actions/bookAction';

const bookRouter = express.Router();

bookRouter.route('/books')
    .get(async (req, res) => {
        try {
            const allBooks = await pool.query('Select * from books');
            return res.status(200).json(allBooks[0]);
        } catch (error) {
            return res.status(400).json(error);
        }
    });

bookRouter.route('/book')
    .get(async (req, res) => {
        try {
            const { book_id } = req.query;
            const book: any = await pool.query('Select * from books WHERE book_id=?', [book_id]);
            return res.status(200).json(book[0][0]);
        } catch (error) {
            return res.status(400).json(error);
        }
    });

bookRouter.route('/book/add')
    .post(async (req, res) => {
        try {
            const { book_name, author, copies } = req.body;
            const queryResult = await pool.query('INSERT INTO books(book_name, author, copies) VALUES(?, ?, ?)', [book_name, author, copies]);

            return res.status(200).json(queryResult[0]);
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    });

bookRouter.route('/book/remove')
    .post(async (req, res) => {
        try {
            const { book_id } = req.query;
            const queryResult = await pool.query('DELETE FROM BOOKS WHERE book_id=?', [book_id]);

            return res.status(200).json(queryResult[0]);
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    });

bookRouter.route('/book/copies/update')
    .put(async (req, res) => {
        try {
            const { book_id, copies } = req.query;
            const queryResult = pool.query('UPDATE BOOKS SET copies=? WHERE book_id=?', [copies, book_id]);

            const book = await getBookById(book_id as string);
            return res.status(200).json(book);
        } catch (error) {
            console.log(error);
            return res.status(400).json(error);
        }
    });
    
export default bookRouter;