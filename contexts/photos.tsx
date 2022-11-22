import { createContext, useEffect, useReducer, useState ,Dispatch ,useContext  } from "react";
import { Account } from "../interfaces/account";

type State = File[] | []

type InitState = {origin :string[], change : string[]} | {origin :[], change : []}

type Action = 
|{type : "save", payload : State}
|{type : "delete", payload : File} 
|{type : "add", payload : File[]} 
|{type : "remove"}

type InitAction =
|{type : "save", payload : InitState}
|{type : "delete", payload : string} 

type PhotoDispatch = Dispatch<Action>;
type UrlsDispatch = Dispatch<InitAction>;

const PhotosStateContext = createContext<State>([]);
const PhotosDispatchContext = createContext<PhotoDispatch | null>(null);

const UrlsStateContext = createContext<InitState>({origin :[], change : []});
const UrlsDispatchContext = createContext<UrlsDispatch | null>(null);

const reducer = (state: State, action : Action):State=>{
    switch(action.type){
        case "save" :
            return action.payload
        case "delete" :
            const dltData : File[] = state.filter(one=>{
              return one!==action.payload
            })
          return dltData;
        case "add" :
            const updateData = [...state,...action.payload]
          return updateData
        case "remove" : 
            return []
    }
}

const initReducer = (state: InitState, action : InitAction):InitState=>{
  switch(action.type){
    case "save" :
      return action.payload
    case "delete" :
        const dltData : string[] = state.change.filter(one=>{
          return one!==action.payload
        })
        // console.log(dltData);
      return {origin: state.origin, change : dltData};
  }
}

export function PhotosProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer,[]);
    const [urls, urlsdispatch] = useReducer(initReducer, {origin :[], change : []});

    return (
      <PhotosStateContext.Provider value={state}>
      <PhotosDispatchContext.Provider value={dispatch}>
      <UrlsStateContext.Provider value={urls}>
      <UrlsDispatchContext.Provider value={urlsdispatch}>
          {children}
      </UrlsDispatchContext.Provider>
      </UrlsStateContext.Provider>
      </PhotosDispatchContext.Provider>
      </PhotosStateContext.Provider>
    );
  }


export function usePhotosState() {
    const state = useContext(PhotosStateContext);
    if (!state){
      // throw new Error('PhotosProvider not found')
    };
    return state;
}

export function usePhotosDispatch() {
    const dispatch = useContext(PhotosDispatchContext);
    if (!dispatch){
      // throw new Error('AccountProvider not found')
    };
    return dispatch as PhotoDispatch;
}

export function useUrlsState() {
  const state = useContext(UrlsStateContext);
  if (!state){
    // throw new Error('UrlsProvider not found')
  };
  return state;
}

export function useUrlsDispatch() {
  const dispatch = useContext(UrlsDispatchContext);
  if (!dispatch){
    // throw new Error('AccountProvider not found')
  };
  return dispatch as UrlsDispatch;
}