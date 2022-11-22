import { createContext, useEffect, useReducer, useState ,Dispatch ,useContext  } from "react";
import { Account } from "../interfaces/account";

type State = {email : string} |null

type Action = 
|{type : "save", payload : State} 
|{type : "remove"}

type SampleDispatch = Dispatch<Action>;

const AccountStateContext = createContext<State | null>(null);
const AccountDispatchContext = createContext<SampleDispatch | null>(null);

const reducer = (state: State, action : Action):State=>{
    switch(action.type){
        case "save" :
            return action.payload
        case "remove" : 
            return null
    }
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer,null);
  
    return (
      <AccountStateContext.Provider value={state}>
        <AccountDispatchContext.Provider value={dispatch}>
          {children}
        </AccountDispatchContext.Provider>
      </AccountStateContext.Provider>
    );
  }


export function useAccountState() {
    const state = useContext(AccountStateContext);
    if (!state){
      // throw new Error('AccountProvider not found')
    };
    return state;
}

export function useAccountDispatch() {
    const dispatch = useContext(AccountDispatchContext);
    if (!dispatch){
      // throw new Error('AccountProvider not found')
    };
    return dispatch as SampleDispatch;
}