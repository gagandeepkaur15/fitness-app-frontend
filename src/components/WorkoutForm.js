import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext();
    
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {title, load, reps};

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json(); //As we are sending the added workout as response from backend
        if(!response.ok){
            setError(json.error); //As we are sending 'error' property from beckend on error
            setEmptyFields(json.emptyFields || []);
        }
        if(response.ok){
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            dispatch({type: 'CREATE_WORKOUT', payload: json});
        }
    }

    return (
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Workout</h3>
        <label>Exercise Title:</label>
        <input
            type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
        >
        </input>
        <label>Load (in kg):</label>
        <input
            type="number"
            onChange={(e)=>setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error' : ''}
        >
        </input>
        <label>Reps:</label>
        <input
            type="number"
            onChange={(e)=>setReps(e.target.value)}
            value={reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
        >
        </input>
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>} {/*If error then show the error state*/}
      </form>  
    );
}

export default WorkoutForm