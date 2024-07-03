export type Exercises = {
   name?: string
   description: string
   course_id: number
   exercise_name: string,
   id?: number
}

export type Class = {
   class_name: string;
   course_id: number;
   start_date?: string;
   end_date?: string;
   id?: number;
   teacher_id?: number;
   name?: string
}

export interface Course {
   course_name: string;
   description: string;
   code: string;
   id?: number;
}

export interface Student {
   user_id: number;
   username: string;
   fullname: string;
   enabled: boolean | null;
   last_login_time: string | null;
   course_name: string;
   id?: number

};

export type Exam = {
   name?: string;
   id: number;
   class_id?: number;
   start_date?: Date;
   end_date?: Date
   description: string;
   exam_id?: number;
   questions: Array<number>;
   exam_cont: checkSubmssion[]
}

export type Submission = {
   exam_id: number
   description: string
   student_id: number
   data_file: any
   exercise_id: number
   class_id: number
}

export type checkSubmssion = {
   questions_id: number,
   exercise_id: number,
   submitted: boolean
}
export type StudentScore = {
   date_time: string;      // ISO 8601 date string
   score: string;          // Score represented as a string
   description: string;    // Description of the score or the answer
   uuid: string;           // Unique identifier for the score entry
   student_id: number;     // ID of the student
   question_id: number;    // ID of the question
   checked: boolean | null;// Whether the score has been checked or not
   name: string;           // Name associated with the entry, possibly a test name
};

export type SubmisType = {
   date_time: string;
   score: string;
   description: string;
   uuid: string;
   student_id: number;
   question_id: number;
   checked: null | boolean; // null or boolean
   name: string;
   language: string;
};

export type TestCase = {
   exercise_id: number;
   test_cases: {
      input: string;
      output: string;
      run_time: number;
   };
};

export type TestCaseData = {
   id: number;
   exercise_id: number;
   input: string;
   output: string;
   run_time: number;
};

export type SubmissionByString = {
   exam_id?: number;
   exercise_id: number;
   description: string;
   class_id: number;
   language?: "C" | "C++";
   source_code?: string;
};

export type Users = {
   id: number;
   username: string;
   fullname: string;
   role: number;
   enabled: boolean;
}


