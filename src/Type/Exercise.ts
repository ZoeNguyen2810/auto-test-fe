export type Exercises = {
   name: string
   description: string
   course_id: number
}

export type Class = {
   class_name: string;
   course_id: string;
   start_date?: Date;
   end_date?: Date;

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
};
