import { Course } from "../Type/Exercise";
import axios from "axios";

export const getListCourse = async (): Promise<Course[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/course/list');
    return res.data.courses;
}