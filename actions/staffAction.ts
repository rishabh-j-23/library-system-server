import pool from '../db/database';

export const getStaffById = async (staff_id: string) => {
    const staff: any = await pool.query('SELECT * FROM staffs WHERE staff_id=?', [staff_id])
    return staff[0][0];
}