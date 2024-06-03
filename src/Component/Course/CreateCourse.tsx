import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Form, Button, Input } from 'antd'
import { useMutation } from 'react-query'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Course } from '../../Type/Exercise'
import { createCourse } from '../../inqueryFetch/classManager'
import './CreateCourse.scss'

const CreateCourse = () => {
    const { TextArea } = Input;
    const { register, handleSubmit, formState: { errors }, control, watch , reset } = useForm<Course>()

    const navigate = useNavigate()

    const mutation = useMutation(createCourse, {
        onSuccess: (data) => {
            console.log('User created successfully:', data);
            if(data.error.code) {
                message.error('Tạo tài khoản that bai')
            }
         
        },
        onError: (error) => {
            console.error('Error creating user:', error);
            message.error('Tạo tài khoản không thành công')
        }
    })

    const onSubmit = async (data: Course) => {
        data.course_id = Math.floor(Math.random() * 1000)
      console.log(data);
      mutation.mutate(data)
      reset()
      navigate(-1)
    }



    return (
        <>
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='Container'>
                <Form.Item
                    label='Course Name'
                    validateStatus={errors.course_name ? "error" : ''}
                    required
                    help={errors.course_name ? errors.course_name.message : ''}
                >
                    <Controller
                        control={control}
                        name='course_name'
                        defaultValue=''
                        rules={{
                            required: 'Không được bỏ trống tên đăng nhập',
                            maxLength: {
                                value: 50,
                                message: 'Độ dài tên không quá 50 kí tự'
                            }
                        }}
                        render={({ field }) => <Input {...field} />} />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    validateStatus={errors.description ? "error" : ''}
                    required
                    help={errors.description ? errors.description.message : ''}
                >
                    <Controller
                        control={control}
                        name='description'
                        defaultValue=''
                        rules={{
                            required: 'Không được bỏ trống mật khẩu',
                            maxLength: {
                                value: 50,
                                message: 'Mật khẩu không dài quá 8 kí tự'
                            }
                        }}
                        render={({ field }) => <TextArea rows={10} {...field} />} />
                </Form.Item>
                <Form.Item
                    label='Mã học phần'
                    validateStatus={errors.code ? 'error' : ''}
                    required
                    help={errors.code ? errors.code.message : ''}
                >
                    <Controller
                        control={control}
                        name='code'
                        defaultValue=''
                        rules={{
                            required: '',
                            maxLength: {
                                value: 50,
                                message: 'Tên dài không quá 50 kí tự'
                            },
                        }}
                        render={({ field }) => <Input {...field} />} />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' style={{ marginLeft: '350px' , height : 40 , width : 150 }}>Tạo Lớp Học</Button>
                </Form.Item>
            </Form>
        </>

    )
}

export default CreateCourse
