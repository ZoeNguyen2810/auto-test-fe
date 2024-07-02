import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Form, Button, Input } from 'antd'
import { useMutation } from 'react-query'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Course } from '../../Type/Exercise'
import { createCourse, courseUpdate } from '../../inqueryFetch/classManager'
import './CreateCourse.scss'

type Props = {
    width?: number
    marginLeft?: number
    marginTop?: number,
    course?: Course
}

const CreateCourse: React.FC<Props> = ({ width, marginLeft, marginTop, course }) => {
    const { TextArea } = Input;
    const { register, handleSubmit, formState: { errors }, control, watch, reset } = useForm<Course>()

    const navigate = useNavigate()

    const mutation = useMutation(createCourse, {
        onSuccess: (data) => {
            message.success('Tạo tài khoản thanh cong')
            navigate('/teacher/manager-Course')

        },
        onError: (error) => {
            console.error('Error creating user:', error);
            message.error('Tạo tài khoản không thành công')
        }
    })
    const mutationUpDate = useMutation(courseUpdate, {
        onSuccess: (data) => {
            message.success('Tạo tài khoản thanh cong')
            navigate('/teacher/manager-Course')

        },
        onError: (error) => {
            console.error('Error creating user:', error);
            message.error('Tạo tài khoản không thành công')
        }
    })

    const onSubmit = async (data: Course) => {
        console.log(data);
        if (width) {
            data.id = course?.id
            mutationUpDate.mutate(data)
            message.success('Cập nhật thông tin thành công')
            console.log('Zoe check in here');
            return;


        }
        mutation.mutate(data)
        // reset()
        // navigate(-1)
    }



    return (
        <>
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='Container' style={{
                width: width ? width : '50%',
                marginLeft: marginLeft ? marginLeft : '30%',
                marginTop: marginTop ? marginTop : '10%'
            }}>{
                    !width && <Button onClick={() => navigate(-1)} type='primary' style={{ width: 100, marginBottom: 15 }}>Back</Button>

                }
                <Form.Item
                    label='Course Name'
                    validateStatus={errors.course_name ? "error" : ''}
                    required
                    help={errors.course_name ? errors.course_name.message : ''}
                >
                    <Controller
                        control={control}
                        name='course_name'
                        defaultValue={course?.course_name}
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
                        defaultValue={course?.description}
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
                        defaultValue={course?.code}
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
                    <Button type='primary' htmlType='submit' style={{ marginLeft: '350px', height: 40, width: 150 }}>{width ? 'Chỉnh sửa khoá học' : 'Tạo khoá học'}</Button>
                </Form.Item>
            </Form>
        </>

    )
}

export default CreateCourse
