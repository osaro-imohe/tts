import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, Action, ObjectType } from "./reducer";

interface ContextProps {
  state: ObjectType;
  dispatch: React.Dispatch<Action>;
}

const StateContext = createContext<ContextProps | undefined>(undefined);

export const useStateDispatch = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateDispatch must be used within a StateProvider");
  }
  return context;
};

export function StateProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}
