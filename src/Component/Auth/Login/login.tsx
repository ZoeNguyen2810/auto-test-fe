import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { Login } from '../../../Type/Auth';
import { useGlobalContext } from '../../../Context';
import { useNavigate } from 'react-router-dom';
import logo from './Animation - 1717000936425.gif'
import axios from 'axios';
import Cookies from 'js-cookie';
import './login.scss'

const LogIn: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<Login>();
    const { isLogged, setIsLogged } = useGlobalContext()
    const navigate = useNavigate()
    const onSubmit = async (data: Login) => {
        data.remember_login = true
        try {

            const res = await axios.post('https://www.mica.edu.vn/act/api/user/login', data);
            const token = res.data.user_info.enabled
            

            // setIsLogged(res.data.user_info.enabled)
            message.success('Login Successfully')
            Cookies.set('UUID', token, { expires: 1 }); 
            console.log(res);
            
            
            reset()
            navigate('/')
        } catch (e) {
            console.log(e);
            message.error('Đăng nhập không thành công xin vui lòng thử lại')
            


        }
    }
    console.log('isLogged', isLogged);
setIsLogged(true)

    return (
        <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='login'>
            <img src={logo} alt="loading..." style={{ marginLeft : '23%' , fontSize : '30px'}} />
            <Form.Item
                label="UserName"
                validateStatus={errors.username ? 'error' : ''}
                required
                help={errors.username ? errors.username.message : ''}>
                <Controller
                    control={control}
                    name='username'
                    defaultValue=''
                    rules={{
                        required: " Hãy nhập name",
                        maxLength: {
                            value: 255,
                            message: "Độ dài tối đa 255 kí tự"
                        }
                    }}
                    render={({ field }) => <Input {...field} />}

                />

            </Form.Item>
            <Form.Item
                label="Password"
                validateStatus={errors.password ? 'error' : ''}
                required
                help={errors.password ? errors.password.message : ''}>
                <Controller
                    control={control}
                    name='password'
                    defaultValue=''
                    rules={{
                        required: " Hãy nhập mật khẩu",
                        maxLength: {
                            value: 8,
                            message: "Độ dài tối đa 8 kí tự"
                        }
                    }}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType='submit' type='primary' style={{ marginLeft: '150px' }} >Login</Button>
            </Form.Item>
            <div> Bạn chưa có tài khoản ?
                <Link to='/create-account'>  Đăng Kí </Link>
            </div>
            <Link to="/forgot-password">Quên mật khẩu ?</Link>

        </Form >
       
    );
};

export default LogIn;
