import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => { //state here represents previous state before updation
    switch(action.type){
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload //payload is the data we pass and is needed for state change
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] //Adding new workout to the top of array
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !==action.payload._id )
            }
        default:
            return state   
    }
}

export const WorkoutsContextProvider = ({children}) => { //Children property consits the components wrapped by WorkoutsContextProvider for eg <App> component
    
    const [state, dispatch] = useReducer(workoutsReducer, { //Dispatch function calls the workoutsReducer function
        workouts: null // Initial value of workouts
    })

    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}> {/* Value consists of objects provided to the children */}
            { children }
        </WorkoutsContext.Provider>
    )
}