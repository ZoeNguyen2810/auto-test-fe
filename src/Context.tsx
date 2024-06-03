import { GlobalContextProps } from "./Type/GlobleProps";

// GlobalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [ isLogged , setIsLogged] = useState(false);

    return (
        <GlobalContext.Provider value={{ isLogged , setIsLogged }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};
