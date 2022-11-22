import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

const BASE_URL = 'http://192.168.2.168:4000';

function App() {
    const [shifts, setShifts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [result, setResult] = useState({});

    useEffect(() => {
        axios.get(`${BASE_URL}/api/shift`).then(response => {
            setShifts(response.data);
        })
    }, []);

    const selectShift = (shift_id) => {
        const index = selected.indexOf(shift_id);
        if (index > -1) {
            setSelected(items => (items.filter(item => item != shift_id)));
        } else {
            if (selected.length > 1) return;
            setSelected(items => ([...items, shift_id]));
        }
    };
    const submit = () => {
        if (selected.length < 2) {
            alert('Should select 2 shifts!');
            return;
        }

        axios.post(`${BASE_URL}/api/shift/compare`, {
            shift_id_1: selected[0],
            shift_id_2: selected[1]
        }).then(response => {
            setResult(response.data);
        });
    };

    const executeQ4 = () => {
        axios.post(`${BASE_URL}/api/query/4`).then(response => {
            console.log(response.data);
        });
    };

    const executeQ5 = () => {
        axios.post(`${BASE_URL}/api/query/5`).then(response => {
            console.log(response.data);
        });
    };

    const executeQ6 = () => {
        axios.post(`${BASE_URL}/api/query/6`, {
            nurse_name: 'Anne'
        }).then(response => {
            console.log(response.data);
        });
    };

    return (
        <div className="container">
            <div className="result-box">
                <div>
                    <p>Overlap Minutes: {result.overlap_mins}</p>
                    <p>Max Overlap Threshold: {result.max_overlap_threshold}</p>
                    <p>Exceeds Overlap Threshold: {result.exceed_threshold?.toString()}</p>
                </div>
                <div className="submit">
                    <button onClick={submit}>Submit</button>
                </div>
            </div>
            <div className="shift-wrapper">
                {
                    shifts.map(shift => (
                        <div
                            className={`shift-box ${selected.includes(shift.shift_id) ? 'selected': ''}`}
                            onClick={() => selectShift(shift.shift_id)}
                        >
                            <p>{shift.facility_name}</p>
                            <p>{shift.shift_date}</p>
                            <p>{shift.start_time} - {shift.end_time}</p>
                        </div>
                    ))
                }
            </div>
            <div className="query-btn-wrapper">
                <button onClick={executeQ4}>Execute Q4 Query</button>
                <button onClick={executeQ5}>Execute Q5 Query</button>
                <button onClick={executeQ6}>Execute Q6 Query</button>
            </div>
        </div>
    );
}

export default App;
