import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SignUp } from '../../../Type/Auth';
import { Form, Button, Input, Select, message } from 'antd';
import './SignUp.scss';
import { createUser } from '../../../inqueryFetch/authFetch';
import { useMutation } from 'react-query';
import { Users } from '../../../Type/Exercise';
import { getDetailUser, updateUser } from '../../../inqueryFetch/classManager';

type Props = {
    userInfo?: number;
    isEdit?: boolean;
    closeDrawer : ( ) => void;
    setListUser : ( ) => void;
};

const SignIn: React.FC<Props> = ({ userInfo, isEdit , closeDrawer , setListUser }) => {
    const { register, handleSubmit, formState: { errors }, control, watch, reset } = useForm<SignUp>();
    const [userInfoDetail, setUser] = useState<Users>();

    const mutation = useMutation(createUser, {
        onSuccess: (data) => {
            console.log('User created successfully:', data);
            message.success('Tạo tài khoản thành công');
            setListUser()
            reset();
        },
        onError: (error) => {
            console.error('Error creating user:', error);
            message.error('Tạo tài khoản không thành công');
        }
    });
    const mutationUpdateUser = useMutation( updateUser, {
        onSuccess: (data) => {
            console.log('User created successfully:', data);
            message.success('Tạo tài khoản thành công');
            setListUser()
            reset();
        },
        onError: (error) => {
            console.error('Error creating user:', error);
            message.error('Sửa thông tin thành công');
        }
    });

    const mutationGetUserInfo = useMutation(getDetailUser, {
        onSuccess: (data) => {
            setUser(data);
            reset(data);  // Update the form with the fetched data
            
        },
        onError: (error) => {
            console.error('Error fetching user details:', error);
        }
    });

    const onSubmit = async (data: SignUp) => {
        if ( isEdit && userInfoDetail) {
            mutationUpdateUser.mutate({ user_id : userInfoDetail?.id , fullname : data.fullname})
            closeDrawer()
            reset()
            return
        }
        console.log(data);
        mutation.mutate(data);
        closeDrawer()
        reset()
    };

    useEffect(() => {
        if (isEdit === false) {
            setUser(undefined);
            reset(); // Clear the form values
        } else if (userInfo) {
            mutationGetUserInfo.mutate(Number(userInfo));
        }
    }, [userInfo, isEdit]);

    return (
        <>
            <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='SignUp'>
                <Form.Item
                    label='Username'
                    validateStatus={errors.username ? "error" : ''}
                    required
                    help={errors.username ? errors.username.message : ''}
                >
                    <Controller
                        control={control}
                        name='username'
                        disabled={isEdit}
                        defaultValue={userInfoDetail?.username || ''}
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
                        disabled={isEdit}
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
                        defaultValue={userInfoDetail?.fullname || ''}
                        rules={{
                            required: 'Không được bỏ trống tên đầy đủ',
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
                        defaultValue={userInfoDetail?.role || undefined}
                        disabled={isEdit}
                        rules={{
                            required: 'Không được bỏ trống role người dùng',
                        }}
                        render={({ field }) => (
                            <Select {...field}>
                                <Select.Option value={1}>Admin</Select.Option>
                                <Select.Option value={2}>Giáo viên</Select.Option>
                                <Select.Option value={3}>Học viên</Select.Option>
                            </Select>
                        )}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' style={{ marginLeft: '200px', marginTop: 100 }}>Submit</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default SignIn;
