import { createContext, useState } from "react";

export const ModalContext = createContext();

export default function ModalProvider({children}){
    
    const [open, setOpen] = useState(false);
    const [type, setType] = useState("");

    function toggleDialog(){
        setOpen(!open);
    }

    //expose variables and methods (states)
    const value = {
        open, setOpen,
        toggleDialog,
        type, setType,
    };

    return(

        //enables other elements to be wrapped by the context provider
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );

}

