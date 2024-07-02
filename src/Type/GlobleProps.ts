import { Exam } from "./Exercise";

export interface GlobalContextProps {
    isLogged: boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    courseId: number;
    setCourseId: React.Dispatch<React.SetStateAction<number>>;
    isEditExam : boolean;
    setIsEditExam : React.Dispatch<React.SetStateAction<boolean>>;
    isRole ?: number;
    setIsRole ?: React.Dispatch<React.SetStateAction<number | undefined>>
}

