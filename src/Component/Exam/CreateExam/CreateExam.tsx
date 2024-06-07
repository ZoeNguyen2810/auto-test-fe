import React from "react";
import { Exercises } from "../../../Type/Exercise";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Select } from "antd";
import "./CreateExam.scss";
import { Typography } from "antd";

const { Title} = Typography

const { Option } = Select;
const { TextArea } = Input;

const CreateExam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Exercises>();
  const handleOnSubmit = (data : Exercises) => { 
    console.log(data);
    
  };
  return (
    <div className="container">
      <Title level={2}>Create Exercise</Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit(handleOnSubmit)}
        className="Additem"
      >
        <Form.Item
          label="Title"
          validateStatus={errors.name ? "error" : ""}
          required
          help={errors.name ? errors.name.message : ""}
        >
          <Controller
            control={control}
            name="name"
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
        <Form.Item
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
        </Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginLeft : '50%'}}>Create Topic</Button>

      </Form>
    </div>
  );
};

export default CreateExam;
