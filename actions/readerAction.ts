import pool from '../db/database';

var user: any;

export const getUserByEmail = async (reader_email: string) => {
    user = await pool.query('SELECT * FROM readers WHERE reader_email=?', [reader_email])
    return user[0][0];
}

export const getByUserById = async (reader_id: string) => {
    user = await pool.query('SELECT * FROM readers WHERE reader_id=?', [reader_id])
    return user[0][0];
}

export const getUserPassword = async (reader_id: string) => {
    user = await pool.query('SELECT reader_password FROM readers WHERE reader_id=?', [reader_id])
    return user[0][0];
}