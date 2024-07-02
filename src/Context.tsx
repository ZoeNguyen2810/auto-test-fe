import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GlobalContextProps } from "./Type/GlobleProps";

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [courseId, setCourseId] = useState(0);
    const [isEditExam, setIsEditExam] = useState(false);
    
    const storedExamDetail = localStorage.getItem('Role');
    const isRole = Number(storedExamDetail)
    return (
        <GlobalContext.Provider value={{ isLogged, setIsLogged, courseId, setCourseId, isEditExam, setIsEditExam , isRole}}>
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
