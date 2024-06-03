import { Class, Course, Student, Exercises } from "../Type/Exercise"
import axios from "axios"


export const createCourse = async (data: Course) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/course/create', data
    )

    return res.data
}

export const deleteCourse = async (data: number) => {
    const res = await axios.delete('https://www.mica.edu.vn/act/api/course/delete', {
        params: {
            course_id: data
        }
    });
    return res.data;
}

export const getCourse = async (): Promise<Course[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/course/list');
    return res.data;
}

export const courseUpdate = async (data: Course) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/course/update_info', data);
    return res.data;
}

export const getDetailCourse = async (course_id: number) => {

    const res = await axios.get(`https://www.mica.edu.vn/act/api/course/get/:id`, {
        params: {
            course_id: course_id
        }
    })
    return res
}


// query class 
export const getListClass = async (): Promise<Class[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/class/list');
    return res.data;
}

export const createClass = async (data: Class) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/class/create', data)

    return res.data
}
export const deleteClass = async (class_id: number) => {
    const res = await axios.delete('https://www.mica.edu.vn/act/api/class/create', {
        params: {
            class_id: class_id
        }
    })

    return res.data
}

export const updateClass = async (data: Class) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/class/update_info', data)

    return res.data
}


export const getDetail = async (class_id: number) => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/class/get', {
        params: {
            class_id: class_id
        }
    })
}

export const addUsertoClass = async (class_id: number, user_id: number) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/class/update_info', {
        class_id: class_id,
        user_id: user_id
    })

    return res.data
}

export const deleteUsertoClass = async (class_id: number, user_id: number) => {
    const res = await axios.delete('https://www.mica.edu.vn/act/api/class/delete_user', {
        params: {
            class_id: class_id,
            user_id: user_id
        }
    })
    return res.data
}


// export const getListUserinClass = async ( class_id : number):Promise<Student[]> => {
//     const res = await axios.get('https://www.mica.edu.vn/act/api/class/get' , {
//         params : {
//             class_id : class_id
//         }
//     })
// }
export const getListUserinClass = async (class_id: number): Promise<Student[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/class/list_user', {
        params: {
            class_id: class_id
        }
    });
    return res.data;
}




export const getDetailExercise = async (exercise_id : number): Promise<Exercises[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/exercise/get', {
        params: {
            exercise_id : exercise_id
        }
    });
    return res.data;
}

export const createExsercise = async (data: Exercises) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/exercise/create', data)

    return res.data
}



export const deleteEx = async (course_id: number) => {
    const res = await axios.delete('https://www.mica.edu.vn/act/api/exercise/delete',
        {
            params: {
                course_id: course_id
            }
        }
    )

    return res.data
}
export const updateExsercise = async (data: Exercises, exercise_id: number) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/exercise/update_info',
        {
            name: data.exercise_name,
            description: data.description,
            exercise_id: exercise_id
        }
    )

    return res.data
}

export const getListExercise = async (course_id: number): Promise<Exercises[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/exercise/list', {
        params: {
            course_id: course_id
        }
    });
    return res.data;
}



