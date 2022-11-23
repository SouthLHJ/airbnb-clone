import { createContext, useEffect, useReducer, useState ,Dispatch ,useContext  } from "react";
import { Account } from "../interfaces/account";
import { DirAmenity } from "../lib/models/dirAmenities";

type AmenityState = DirAmenity[] |null

type AmenityAction = 
|{type : "save", payload : AmenityState} 
|{type : "remove"}

type DirDispatch = Dispatch<AmenityAction>;

const AmenityStateContext = createContext<AmenityState | null>(null);
const AmenityDispatchContext = createContext<DirDispatch | null>(null);

const reducer = (state: AmenityState, action : AmenityAction):AmenityState=>{
    switch(action.type){
        case "save" :
            return action.payload
        case "remove" : 
            return null
    }
}

export function DirAmenityProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer,null);
  
    return (
      <AmenityStateContext.Provider value={state}>
        <AmenityDispatchContext.Provider value={dispatch}>
          {children}
        </AmenityDispatchContext.Provider>
      </AmenityStateContext.Provider>
    );
  }


export function useDirAmenityState() {
    const state = useContext(AmenityStateContext);
    if (!state){
      // throw new Error('AccountProvider not found')
    };
    return state;
}

export function useDirAmenityDispatch() {
    const dispatch = useContext(AmenityDispatchContext);
    if (!dispatch){
      // throw new Error('AccountProvider not found')
    };
    return dispatch as DirDispatch;
}