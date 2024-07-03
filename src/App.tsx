import React, { useEffect, useState } from 'react';
import { Route, Routes, useRoutes, useNavigate, useLocation } from 'react-router-dom';
import LogIn from './Component/Auth/Login/login';
import SignIn from './Component/Auth/SignUp/SignUp';
import ForgotPass from './Component/Auth/Fogotpassword/forgotPass';
import IconLogout from './Component/Auth/Login/iconLogout';
import ClassDetail from './Component/Teacher/Class/ClassDetail/ClassDetail';
import { Menu, message } from 'antd';
import { BookOutlined, FormOutlined, HomeOutlined, QuestionCircleOutlined, ReadOutlined, ScheduleOutlined , UserOutlined } from '@ant-design/icons';
import './App.scss';
import { Home } from './Component/Home/Home';
import { InfinityScroll } from './Component/Home/InfinityScroll/InfinityScroll';
import { Exam } from './Component/Exam/Exam';
import { Description } from './Component/Exam/CardExam/Description/Description';
import { ChatGPT } from './Component/Support/formSelection/ChatGPT';
import Lesson from './Component/Lesson/lesson';
import CreateExam from './Component/Exam/CreateExam/CreateExam';
import StudentTable from './Component/Teacher/managerStudent/StudentTable';
import ClassTable from './Component/Teacher/Class/ClassTable';
import { AuthWrapper } from './AuthWrapper';
import Course from './Component/Course/Course';
import CreateCourse from './Component/Course/CreateCourse';
import CourseDetail from './Component/Course/CourseDetail/CourseDetail';
import Cookies from 'js-cookie';
import CreateExamDrag from './Component/Teacher/Class/CreateExamDrag/CreateExamDrag';
import { useGlobalContext } from './Context';
import Submission from './Component/Exam/Submission/Submission';
import UserManagement from './Component/UserManagement/UserManagement';
import NotFound from './Component/NotFound/NotFound';
import ChatBox from './Component/Exam/ChatBox';

function App() {
  const [currentPath, setCurrentPath] = useState('/'); // State để lưu trữ đường dẫn hiện tại
  const location = useLocation(); // Hook của react-router-dom để lấy đường dẫn hiện tại
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const { isRole } = useGlobalContext();

  useEffect(() => {
    setCurrentPath(location.pathname); // Cập nhật đường dẫn hiện tại khi location thay đổi
    if (location.pathname === '/login' || location.pathname === '/forgot-password' || location.pathname === '/create-account') {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location]);

  const handleNavigate = (key: string) => {
    if (key === '/logout') {
      // Xóa UUID khỏi cookie
      Cookies.remove('UUID');
      // Hiển thị thông báo
      message.success('Đăng xuất thành công');
      // Điều hướng đến trang đăng nhập
      navigate('/login');
    } else {
      navigate(key);
    }
  };

  const routes = useRoutes([
    { path: "/login", element: <LogIn /> },
    // { path: '/create-account', element: <SignIn /> },
    { path: '/forgot-password', element: <ForgotPass /> },
    { path: "/", element:<AuthWrapper><Home /></AuthWrapper>  },
    { path: "/infinity-scroll", element: <AuthWrapper><InfinityScroll /></AuthWrapper> },
    { path: '/exam', element: <AuthWrapper><Exam /></AuthWrapper> },
    { path: '/class-submission/:id/exam/:examId', element: <AuthWrapper><Description /></AuthWrapper> },
    { path: '/support/chatGPT', element: <AuthWrapper><ChatBox width={1300} height={750}/></AuthWrapper> },
    { path: '/lesson-learn', element: <AuthWrapper><Lesson /></AuthWrapper> },
    { path: '/teacher/manager-student', element: <AuthWrapper><StudentTable /></AuthWrapper> },
    { path: '/teacher/course/class', element: <AuthWrapper><ClassTable /></AuthWrapper> },
    { path: '/teacher/manager-Course', element: <AuthWrapper><Course /></AuthWrapper> },
    { path: '/teacher/create-Course', element: <CreateCourse /> },
    { path: '/course-detail/:id', element: <AuthWrapper><CourseDetail /></AuthWrapper> },
    { path: '/class-detail/:id', element: <AuthWrapper><ClassDetail /></AuthWrapper> },
    { path: '/class/:id/list-exam', element: <AuthWrapper><CreateExamDrag /></AuthWrapper> },
    { path: '/class/:id/exam/:examId', element: <AuthWrapper><CreateExamDrag /></AuthWrapper> },
    { path: '/class/:id/exam/:examId/submission' , element:<Submission />},
    // { path : '/user-management' , element: <AuthWrapper><UserManagement /></AuthWrapper>},
    { path : '/user-management' , element: <UserManagement />},
    { path: '/logout', element: <AuthWrapper><IconLogout /></AuthWrapper> },
    { path: '*', element: <NotFound /> }

  ]);

  const menuItems = [
    { key: '/', label: 'Home', icon: <HomeOutlined style={{ fontSize: 15 }} /> },
    { key: '/user-management' , label : 'User Management', icon: <UserOutlined  style={{ fontSize: 15 }} /> , condition: isRole === 1 },
    { key: '/exam', label: 'Exam', icon: <FormOutlined /> , condition: isRole === 3 },
    {
      key: '/support',
      label: 'Support',
      icon: <QuestionCircleOutlined style={{ fontSize: 15 }} />,
      children: [
        { key: '/support/chatGPT', label: 'chatGPT' },
        { key: '/support/anotherOption', label: 'Another Option' }
      ]
    },
    { key: '/lesson-learn', label: "Lesson Learn", icon: <BookOutlined /> , condition : isRole === 3},
    { key: '/teacher/manager-Course', label: 'Course', icon: <ScheduleOutlined />, condition: isRole === 1 || isRole === 2 },
    { key: '/teacher/course/class', label: 'Class', icon: <ScheduleOutlined /> },
    { key: '/logout', label: 'Log Out', icon: <IconLogout /> }
  ];

  const token = Cookies.get('UUID');
  const filteredMenuItems = menuItems.filter(item => item.condition === undefined || item.condition);

  return (
    <>
      {routes}
      {
        show && (
          <div style={{ display: 'flex', flexDirection: 'column-reverse' }} className='sidebar'>
            {
             token && <Menu theme="dark" mode='vertical' selectedKeys={[currentPath]} style={{ width: '230px', height: '1500px' }}>
              {filteredMenuItems.map(item => (
                item.children ?
                  <Menu.SubMenu key={item.key} title={<span>{item.icon} {item.label}</span>}>
                    {item.children.map(child => (
                      <Menu.Item key={child.key} onClick={() => handleNavigate(child.key)}>{child.label}</Menu.Item>
                    ))}
                  </Menu.SubMenu> :
                  <Menu.Item key={item.key} onClick={() => handleNavigate(item.key)}>
                    {item.icon} {item.label}
                  </Menu.Item>
              ))}
            </Menu>
            }
            
          </div>
        )
      }
    </>
  );
}

export default App;
