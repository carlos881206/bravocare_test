import connection from '../config/database';
import {calcOverlap} from "../helpers/time.overlap";

export const list = async (req, res) => {
    const result = await connection.query(`SELECT question_one_shifts.*, facilities.facility_name, to_char(question_one_shifts.shift_date, 'YYYY-MM-DD') as shift_date FROM question_one_shifts JOIN facilities ON question_one_shifts.facility_id = facilities.facility_id`);
    return res.status(200).send(result.rows);
}

export const compare = async (req, res) => {
    const { shift_id_1, shift_id_2 } = req.body;
    const result = await connection.query(`SELECT *, to_char(shift_date, 'YYYY-MM-DD') as shift_date FROM question_one_shifts WHERE shift_id IN (${shift_id_1}, ${shift_id_2})`);
    const firstShift = result.rows.find(shift => shift.shift_id == shift_id_1);
    const secondShift = result.rows.find(shift => shift.shift_id == shift_id_2);
    const firstStart = new Date(firstShift.shift_date + 'T' + firstShift.start_time);
    const firstEnd = new Date(firstShift.shift_date + 'T' + firstShift.end_time);
    const secondStart = new Date(secondShift.shift_date + 'T' + secondShift.start_time);
    const secondEnd = new Date(secondShift.shift_date + 'T' + secondShift.end_time);
    const overlapMinutes = calcOverlap(firstStart, firstEnd, secondStart, secondEnd);
    const maxOverlapThreshold = firstShift.facility_id == secondShift.facility_id ? 30 : 0;
    return res.status(200).json({
        overlap_mins: overlapMinutes,
        max_overlap_threshold: maxOverlapThreshold,
        exceed_threshold: overlapMinutes > maxOverlapThreshold
    });
}