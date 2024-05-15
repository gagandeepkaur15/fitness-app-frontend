import { useEffect, useState } from "react";
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {

    const [workouts, setWorkouts] = useState(null); 

    useEffect(()=>{
        const fetchWorkoutsFunc = async () => {
            const response = await fetch('/api/workouts'); //No need to add localhost and port as it has been added as proxy in package.json so all requests will automatically be directed to localhost:4000 ie the server
            // NOTE - this proxy path only works for dev and not for production
            // const response = await fetch('http://localhost:4000/api/workouts');
            const data = await response.json();
            console.log("Data");
            console.log(data);
 
            if(response.ok){
                setWorkouts(data);
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