"use client";
import { useReducer, createContext, Dispatch } from "react";

type Form = { fullname?: string; email?: string; inquirySource?: "Google" | "Social Media" | "Friends" };
type ActionType = { type: "setFormValues"; form: Form };

const formInital: Form = {
    fullname: "",
    email: "",
};
const contextInitalValue: { value: Form; dispatch: Dispatch<ActionType> } = { value: formInital, dispatch: () => {} };
export const formContext = createContext(contextInitalValue);

const reducer = (state: Form, action: ActionType) => {
    let newState: Form = state;
    switch (action.type) {
        case "setFormValues":
            newState = action.form;
            break;
    }
    return newState;
};

const FormContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [form, dispatch] = useReducer(reducer, formInital);
    return <formContext.Provider value={{ value: form, dispatch }}>{children}</formContext.Provider>;
};

export default FormContextProvider;
