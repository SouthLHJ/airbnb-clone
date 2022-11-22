import mongoose from "mongoose";
import { createContext, useEffect, useReducer, useState ,Dispatch ,useContext  } from "react";
import { Accommodation, Location,FloorPlan ,Amenities } from "../interfaces/becomehost/accommodation";

type State = Accommodation | null

type Action = 
|{type : "save", payload : Accommodation}
|{type : "remove"}

type AccommodationDispatch = Dispatch<Action>;

const AccommodationStateContext = createContext<State | null>(null);
const AccommodationDispatchContext = createContext<AccommodationDispatch | null>(null);

const reducer = (state: State, action : Action):State=>{
    switch(action.type){
        case "save" :
            return action.payload
        
        case "remove" : 
            return null
    }
}

export function AccommodationProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer,null);
    
  
    return (
      <AccommodationStateContext.Provider value={state}>
        <AccommodationDispatchContext.Provider value={dispatch}>
          {children}
        </AccommodationDispatchContext.Provider>
      </AccommodationStateContext.Provider>
    );
  }


export function useAccommodationState() {
    const state = useContext(AccommodationStateContext);
    if (!state){
      // throw new Error('AccountProvider not found')
    };
    return state;
}

export function useAccommodationDispatch() {
    const dispatch = useContext(AccommodationDispatchContext);
    if (!dispatch){
      // throw new Error('AccountProvider not found')
    };
    return dispatch as AccommodationDispatch;
}