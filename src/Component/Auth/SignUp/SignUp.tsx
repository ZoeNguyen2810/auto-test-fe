import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SignUp } from '../../../Type/Auth'
import { Form, Button, Input } from 'antd'
import './SignUp.scss'
import { createUser } from '../../../inqueryFetch/authFetch'
import { useMutation } from 'react-query'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

const SignIn: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, control, watch , reset } = useForm<SignUp>()

    const navigate = useNavigate()

    const mutation = useMutation(createUser, {
        onSuccess: (data) => {
            console.log('User created successfully:', data);
            message.success('Tạo tài khoản thành công')
            reset()
            navigate('/login')
        },
        onError: (error) => {
            console.error('Error creating user:', error);
            message.error('Tạo tài khoản không thành công')
        }
    })

    const onSubmit = async (data: SignUp) => {
      console.log(data);
      mutation.mutate(data)
       
    }

    const watchPassword = watch('password')


    return (
        <>
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='SignUp'>
                <Form.Item
                    label='Username'
                    validateStatus={errors.userName ? "error" : ''}
                    required
                    help={errors.userName ? errors.userName.message : ''}
                >
                    <Controller
                        control={control}
                        name='userName'
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
                    label="Password"
                    validateStatus={errors.password ? "error" : ''}
                    required
                    help={errors.password ? errors.password.message : ''}
                >
                    <Controller
                        control={control}
                        name='password'
                        defaultValue=''
                        rules={{
                            required: 'Không được bỏ trống mật khẩu',
                            maxLength: {
                                value: 8,
                                message: 'Mật khẩu không dài quá 8 kí tự'
                            }
                        }}
                        render={({ field }) => <Input {...field} />} />
                </Form.Item>
                <Form.Item
                    label='FullName'
                    validateStatus={errors.fullname ? 'error' : ''}
                    required
                    help={errors.fullname ? errors.fullname.message : ''}
                >
                    <Controller
                        control={control}
                        name='fullname'
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
                <Form.Item
                    label="Role"
                    validateStatus={errors.role ? "error" : ''}
                    required
                    help={errors.role ? errors.role.message : ''}
                >
                    <Controller
                        control={control}
                        name='role'
                        defaultValue={1}
                        rules={{
                            required: 'Không được bỏ trống role người dùng',
                            maxLength: {
                                value: 8,
                                message: 'Mật khẩu không dài quá 8 kí tự'
                            }
                        }}
                        render={({ field }) => <Input {...field} />} />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' style={{ marginLeft: '150px' }}>Đăng Kí</Button>
                </Form.Item>
            </Form>
        </>

    )
}

export default SignIn
