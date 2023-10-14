import pool from '../db/database';

export const getBookById = async (book_id: string) => {
    const book: any = await pool.query('SELECT * FROM BOOKS WHERE book_id=?', [book_id])
    return book[0][0];
}