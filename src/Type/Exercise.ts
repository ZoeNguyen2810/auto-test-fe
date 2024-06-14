export type Exercises = {
   name?: string
   description: string
   course_id: number
   exercise_name: string,
   id?: number
}

export type Class = {
   class_name: string;
   course_id?: number;
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
   id?: number;
   class_id?: number;
   start_date?: Date;
   end_date?: Date
   description: string;
   exam_id ?: number
}
