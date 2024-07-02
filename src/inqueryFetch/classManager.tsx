import { idText } from "typescript"
import { Class, Course, Student, Exercises, Exam, Submission, StudentScore, SubmisType, TestCase, TestCaseData, SubmissionByString } from "../Type/Exercise"
import { useGlobalContext } from "../Context"
import axios from "axios"



export const createCourse = async (data: Course) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/course/create', data
    )

    return res.data.courses
}

export const deleteCourse = async (id: number) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/course/delete', {
        course_id: id
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

export const getDetailCourse = async (course_id: number): Promise<Course> => {

    const res = await axios.get(`https://www.mica.edu.vn/act/api/course/get`, {
        params: {
            course_id: course_id
        }
    })
    return res.data
}


// query class 
export const getListClass = async () => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/class/list');
    return res.data.classes;
}

export const createClass = async (data: Class) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/class/create', data)

    return res.data
}
export const deleteClass = async (class_id: number) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/class/delete', {
        class_id: class_id
    }
    )

    return res.data
}


export const updateClass = async (data: Class) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/class/update_info', data)

    return res.data
}


export const getDetailClass = async (class_id: number) => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/class/get', {
        params: {
            class_id: class_id
        }
    })
    return res.data
}

export const addUsertoClass = async ({ class_id, user_id }: { class_id: number, user_id: number }) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/class/add_user', {
        class_id: class_id,
        user_id: user_id
    })

    return res.data
}

export const deleteUsertoClass = async (student_id: number) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/class/delete_user', {
        student_id: student_id
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
    return res.data.students;
}

export const getAllStudent = async (): Promise<Student[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/student_list')

    return res.data.students
}




export const getDetailExercise = async (exercise_id: number): Promise<Exercises[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/exercise/get', {
        params: {
            exercise_id: exercise_id
        }
    });
    return res.data;
}

export const createExsercise = async (data: Exercises) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/exercise/create', data)

    return res.data
}



export const deleteEx = async (exercise_id: number) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/exercise/delete',
        {
            exercise_id: exercise_id
        }
    )

    return res.data
}
export const updateExsercise = async (data: Exercises, exercise_id: number) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/exercise/update_info',
        {
            name: data.name,
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
    return res.data.exercises;
}

export const getListExam = async (class_id?: number): Promise<Exam[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/exam/list', {
        params: {
            class_id: class_id
        }
    })
    return res.data.exam
}
export const createExam = async (data: Exam) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/exam/create', data)
    return res.data
}

export const getDetailExam = async (exam_id: number) => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/exam/get', {
        params: {
            exam_id: exam_id
        }
    })
    return res.data
}
export const deleteExam = async (exam_id: number) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/exam/delete', {
        exam_id: exam_id
    })
    return res.data
}

export const updateExam = async (data: Exam) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/exam/update_info', data)
    return res.data
}
export const getListExamStudent = async (): Promise<Exam[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/exam/list_all')
    return res.data.exam
}
export const getSubmissionList = async (exam_id: number, class_id: number) => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/submission/list', {
        params: {
            exam_id: exam_id,
            class_id: class_id
        }
    });
    return res.data.submissions;
}
export const createSubmission = async (formData: FormData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  
    const res = await axios.post(
      "https://www.mica.edu.vn/act/api/submission/create",
      formData,
      config
    );
    return res.data;
  };
export const getListSubmissions = async ({ exam_id, exercise_id, class_id }: { exam_id: number, exercise_id: number, class_id: number }): Promise<StudentScore[]> => {

    const res = await axios.get('https://www.mica.edu.vn/act/api/submission/list', {
        params: {
            exam_id: exam_id,
            exercise_id: exercise_id,
            class_id: class_id
        }
    })

    return res.data.list_submission
}

export const getDetailSubmission = async (submission_id: string):Promise<SubmisType> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/submission/get', {
        params: {
            submission_id: submission_id
        }
    })
    return res.data
}
export const getDetailSubmissionFile = async (submission_id: string) => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/submission/get-file', {
        params: {
            submission_id: submission_id
        }
    })
    return res.data
}

export const getCheckSubmission = async ({ exam_id , exercise_id} : { exam_id : number , exercise_id : number}) => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/submission/check' , {
        params : {
            exam_id : exam_id,
            exercise_id : exercise_id
        }
    })
    return res.data
}

export const createTestCase = async ( testCase : TestCase) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/test_case/create', {
        exercise_id : testCase.exercise_id,
        test_cases :[ testCase.test_cases]

    })
    return res.data
}

export const getListTestCase = async (exercise_id : number):Promise<TestCaseData[]> => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/test_case/list', {
        params: {
            exercise_id: exercise_id
        }
    })
    return res.data.testcase
}

export const getDetailTestCase = async (test_case_id : number) => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/test_case/get', {
        params: {
            test_case_id: test_case_id
        }
    })
    return res.data
}

export const deleteTestCase = async (test_case_id : number) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/test_case/delete', {
        test_case_id : test_case_id
    }
    )
    return res.data
}

export const getListUser = async () => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/user/list' )
    return res.data
}

export const createSubmissionByPostString = async ( data : SubmissionByString) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/submission/create_bytext' , data)
    return res.data
}

