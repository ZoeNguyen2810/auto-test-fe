import React from "react";
import CardLesson from "./Card/CardLesson";
import './lesson.scss'

const Lesson = () => {
  return (
    <div
      style={{ marginLeft: 240, marginTop: 50 }}
      className="lesson-container"
    >
      <div className="lesson-item">
        <CardLesson
          src="https://i0.wp.com/youdemy.co/wp-content/uploads/2023/10/2473048_8255_5.jpg?resize=540%2C340&ssl=1"
          title="Complete Python Developer in 2023: Zero to Mastery"
          description="This course includes:
     - 30.5 hours on-demand video
    - 1 coding exercise
    - 30h 30m
    "
          link="https://youdemy.co/courses/complete-python-developer-in-2023-zero-to-mastery-free-download/"
        />
      </div>
      <div className="lesson-item">
        <CardLesson
          title="Complete Machine Learning & Data Science Bootcamp 2023"
          description="This course includes:
            - 43.5 hours on-demand video
            - 1 coding exercise"
          src="https://i0.wp.com/youdemy.co/wp-content/uploads/2023/04/2511476_4e38_5.jpg?resize=540%2C340&ssl=1"
          link="https://youdemy.co/courses/complete-machine-learning-data-science-bootcamp-free-download/"
        />
      </div>
      <div className="lesson-item">
        <CardLesson
          src="https://i0.wp.com/youdemy.co/wp-content/uploads/2023/04/1917546_682b_3.jpg?resize=540%2C340&ssl=1"
          title="Master the Coding Interview: Data Structures + Algorithms"
          description="This course includes:
            19.5 hours on-demand video
            53 articles"
          link="https://youdemy.co/courses/master-the-coding-interview-data-structures-algorithms-free-download/"
        />
      </div>
      <div className="lesson-item">
        <CardLesson
          src="https://i0.wp.com/youdemy.co/wp-content/uploads/2023/03/4304531_1b5a.jpg?resize=540%2C340&ssl=1"
          description="Step-by-step guide from a top 3% rated freelancer on Upwork"
          title="Complete Guide to Freelancing in 2023: Zero to Mastery"
          link="https://youdemy.co/courses/complete-guide-to-freelancing-in-2023-zero-to-mastery-free-download/"
        />
      </div>
      <div className="lesson-item">
        <CardLesson
          title="100 Days of Code: The Complete Python Pro Bootcamp for 2023"
          description="You will master the Python programming language by building 100 unique projects over 100 days."
          src="https://i0.wp.com/youdemy.co/wp-content/uploads/2023/03/2776760_f176_10-1.jpg?resize=540%2C340&ssl=1"
          link="https://youdemy.co/courses/100-days-of-code-the-complete-python-pro-bootcamp-free-download-course/"
        />
      </div>
      <div className="lesson-item"></div>
    </div>
  );
};

export default Lesson;
