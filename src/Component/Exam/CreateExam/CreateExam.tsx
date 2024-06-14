import React from "react";
import { Exercises } from "../../../Type/Exercise";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Select , message } from "antd";
import { createExsercise } from "../../../inqueryFetch/classManager";
import { useMutation } from "react-query";
import "./CreateExam.scss";
import { Typography } from "antd";

const { Title} = Typography

const { Option } = Select;
const { TextArea } = Input;

type Props = {
  course_id : number,
  mutation: ( course_id : number) => void;
  closePopup : () => void
}

const CreateExam:React.FC<Props> = ({ course_id , mutation , closePopup}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Exercises>();
  const mutaCreateCourse = useMutation( createExsercise, {
    onSuccess: (data) => {
      message.success('Tạo bài tập thành công !');
      mutation(course_id)
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      message.error('Không thể lấy thông tin');
    }
  });
  const handleOnSubmit = (data : Exercises) => { 
    data.course_id = course_id
    console.log(data);
    mutaCreateCourse.mutate(data)
    reset()
    closePopup()
    
  };
  return (
    <div className="container">
      {/* <Title level={5}>Tạo bài tập</Title> */}
      <Form
        layout="vertical"
        onFinish={handleSubmit(handleOnSubmit)}
        className="Additem"
        style={{ width : '130%' , marginLeft : -170}}
      >
        <Form.Item
          label="Title"
          validateStatus={errors.exercise_name ? "error" : ""}
          required
          help={errors.exercise_name ? errors.exercise_name.message : ""}
        >
          <Controller
            control={control}
            name="exercise_name"
            defaultValue=""
            rules={{
              required: "Khong duoc bo trong",
              maxLength: {
                value: 255,
                message: "Do dai toi da 255 ki tu",
              },
            }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          validateStatus={errors.description ? "error" : ""}
          required
          help={errors.description ? errors.description.message : ""}
        >
          <Controller
            control={control}
            name="description"
            defaultValue=""
            rules={{
              required: "Khong duoc bo trong",
              maxLength: {
                value: 255,
                message: "Do dai toi da 255 ki tu",
              },
            }}
            render={({ field }) => <TextArea  rows={13} {...field} />}
          />
        </Form.Item>
        {/* <Form.Item
          label="Topic"
          validateStatus={errors.course_id ? "error" : ""}
          required
          help={errors.course_id ? errors.course_id.message : ""}
        >
          <Controller
            control={control}
            name="course_id"
            rules={{
              required: "Khong duoc bo trong",
              maxLength: {
                value: 255,
                message: "Do dai toi da 255 ki tu",
              },
            }}
            render={({ field }) => (
              <Select {...field}>
                <Option value="1">Thuat Toan</Option>
                <Option value="2">OOP</Option>
              </Select>
            )}
          />
        </Form.Item> */}
        <Button type="primary" htmlType="submit" style={{ marginLeft : '50%'}}>Tạo bài tập </Button>
        
      </Form>
    </div>
  );
};

export default CreateExam;
