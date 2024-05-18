import { useEffect, useState } from "react";
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const Home = () => {

    // const [workouts, setWorkouts] = useState(null);
    const {workouts, dispatch} = useWorkoutsContext();

    useEffect(()=>{
        const fetchWorkoutsFunc = async () => {
            const response = await fetch('/api/workouts'); //No need to add localhost and port as it has been added as proxy in package.json so all requests will automatically be directed to localhost:4000 ie the server
            // NOTE - this proxy path only works for dev and not for production
            // const response = await fetch('http://localhost:4000/api/workouts');
            const data = await response.json();
 
            if(response.ok){
                // setWorkouts(data);
                dispatch({type: 'SET_WORKOUTS', payload: data})
            }
        }
        fetchWorkoutsFunc();
    }, []);

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    // <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home