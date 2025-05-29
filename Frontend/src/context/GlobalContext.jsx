import { createContext, useState } from "react";

const GlobalContext = createContext()

export default function GlobalContextProvider({children}){



    return(
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    )
}
export {GlobalContext}