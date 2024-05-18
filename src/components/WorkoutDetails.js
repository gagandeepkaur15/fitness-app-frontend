import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutDetails = (({workout})=>{
    const { dispatch } = useWorkoutsContext();

    const handleClick = async () => {
        const response = await fetch('/api/workouts/'+workout._id, {
            method: 'DELETE'
        })
        const json = await response.json(); // In API we are sending the deleted workout as response

        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
});

export default WorkoutDetails;