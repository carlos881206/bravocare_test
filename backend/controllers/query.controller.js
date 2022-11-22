import connection from '../config/database';

export const Q4 = async (req, res) => {
    const result = await connection.query(
        `SELECT j.*,
            COUNT(nhj.nurse_id) FILTER (WHERE n.nurse_type = j.nurse_type_needed) as hired_nurse_count,
            total_number_nurses_needed - COUNT(nhj.nurse_id) FILTER (WHERE n.nurse_type = j.nurse_type_needed) as remaining_spots 
            FROM jobs j
                JOIN nurse_hired_jobs nhj ON nhj.job_id = j.job_id 
                JOIN nurses n ON n.nurse_id = nhj.nurse_id 
                GROUP BY j.job_id
                ORDER BY j.facility_id, j.nurse_type_needed`
    );
    return res.status(200).send(result.rows);
}

export const Q5 = async (req, res) => {
    const result = await connection.query(
        `SELECT n.*, COUNT(j1.job_id) FILTER (where j1.remaining_spots > 0) as available_jobs_count 
            FROM nurses n
            JOIN 
            (
            SELECT j.job_id, j.nurse_type_needed ,
            total_number_nurses_needed - COUNT(nhj.nurse_id) FILTER (where n.nurse_type = j.nurse_type_needed) as remaining_spots 
            FROM jobs j
            JOIN nurse_hired_jobs nhj ON nhj.job_id = j.job_id 
            JOIN nurses n ON n.nurse_id = nhj.nurse_id 
            GROUP BY j.job_id
            ) j1
            ON j1.nurse_type_needed = n.nurse_type 
            GROUP BY n.nurse_id 
            ORDER BY n.nurse_id;
        `
    );
    return res.status(200).send(result.rows);
}

export const Q6 = async (req, res) => {
    const { nurse_name } = req.body;
    const result = await connection.query(
        `SELECT DISTINCT n2.nurse_name, j.facility_id, nhj2.nurse_id  from nurses n 
            JOIN nurse_hired_jobs nhj ON nhj.nurse_id = n.nurse_id 
            JOIN jobs j ON j.job_id = nhj.job_id 
            JOIN jobs j2 ON j2.facility_id = j.facility_id 
            JOIN nurse_hired_jobs nhj2 ON nhj2.job_id = j2.job_id  
            JOIN nurses n2 ON n2.nurse_id = nhj2.nurse_id 
            WHERE n.nurse_name = '${nurse_name}' AND n2.nurse_name != '${nurse_name}';
        `);
    return res.status(200).send(result.rows);
}