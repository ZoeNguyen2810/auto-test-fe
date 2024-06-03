import React from 'react'
import { forGotPassword } from '../../../Type/Auth'
import { Controller, useForm } from 'react-hook-form'
import { Form, Input, Button, message } from 'antd'
import './fogotPass.scss'
const ForgotPass: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<forGotPassword>()
    const onSubmit = (data: forGotPassword) => {
        console.log(data);

    }
    return (
        <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='forgot'>
            <Form.Item
                label="Email"
                name='confirmPassword'
                validateStatus={errors.email ? 'error' : ''}
                help={errors.email ? errors.email.message : ''}>
                <Controller
                    control={control}
                    name='email'
                    defaultValue=''
                    rules={{
                        required: "Không được bỏ trống",
                        maxLength: {
                            value: 255,
                            message: "Không được dài quá 255 kí tự"
                        }

                    }}
                    render={({ field }) => <Input {...field} />}
                />

            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' type='primary' style={{ marginLeft: '150px' }}>Gửi Email</Button>
            </Form.Item>

        </Form>
    )
}

export default ForgotPass
