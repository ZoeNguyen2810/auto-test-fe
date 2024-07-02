import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Typography, message, Drawer, Modal } from 'antd';
import { ReactComponent as Logo } from '../exImg.svg';
import './CourseDetail.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { getListExercise, getDetailCourse, deleteCourse, deleteEx, createTestCase , getListTestCase } from '../../../inqueryFetch/classManager';
import { Course, Exercises, TestCaseData } from '../../../Type/Exercise';
import { ReactComponent as Img1 } from './img1.svg';
import { Card, Space } from 'antd';
import { ContactsOutlined, RestOutlined } from '@ant-design/icons';
import CreateCourse from '../CreateCourse';
import CreateExam from '../../Exam/CreateExam/CreateExam';
import { useGlobalContext } from '../../../Context';
import TestCaseComponent from '../../Exam/TestCase/TestCase';

const { Text } = Typography;

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const { isRole } = useGlobalContext()
  const navigate = useNavigate();
  const [excer, setEx] = useState<Exercises[]>([]);
  const [course, setCourse] = useState<Course>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDeleteStudent, setIsModalOpenDeleteStudent] = useState(false);
  const [addEx, setAddEx] = useState(false)
  const [idEx, setIdExer] = useState(0)
  const [isAddTestCase, setIsAddTestCase] = useState(false)
  const [listTestCase , setListTestCase] = useState<TestCaseData[]>([])


  const mutation = useMutation(getListExercise, {
    onSuccess: (data) => {
      setEx(data);
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      message.error('Không thể lấy thông tin');
    }
  });
  const mutationCoures = useMutation(getDetailCourse, {
    onSuccess: (data) => {
      message.success('Lấy thông tin thành công');
      setCourse(data)
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      message.error('Không thể lấy thông tin');
    }
  });
  const mutationDelete = useMutation(deleteCourse, {
    onSuccess: (data) => {
      message.success('Xoá khoá học thành công');
      navigate(-1)
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      message.error('Xoá khoá học không thành công');
    }
  });
  const muationGetListTestCase = useMutation(getListTestCase, {
    onSuccess: (data) => {
        // setIsAddTestCase(false)
        setListTestCase(data)
    },
    onError: (error) => {
        console.error('Error creating user:', error);
        message.error('Tạo không thành công');
    }
})
  const mutationDeleteEx = useMutation(deleteEx, {
    onSuccess: (data) => {
      mutation.mutate(Number(id))
      message.success('Xoá khoá học thành công');
    },
    onError: (error) => {
      console.error('Error creating user:', error);
      message.error('Xoá khoá học không thành công');
    }
  });


  useEffect(() => {
    mutation.mutate(Number(id));
    const course_id = Number(id)
    mutationCoures.mutate(course_id)
  }, [])
  console.log('Zoe data', course);

  const data = excer.map(item => ({
    title: item.name,
    descrition: item.description,
    id: item.id
  }));
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onDelete = () => {
    mutationDelete.mutate(Number(id))
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalStudent = () => {
    setIsModalOpenDeleteStudent(true);
  };

  const handleOk = () => {
    onDelete()
    // setIsModalOpen(false);
    setIsModalOpenDeleteStudent(false)
  };
  const handleOkStudent = () => {
    // onDelete()
    // setIsModalOpen(false);
    mutationDeleteEx.mutate(idEx)
    setIsModalOpenDeleteStudent(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelStudent = () => {
    setIsModalOpenDeleteStudent(false);
  };
  const handleAddEx = () => {
    showModal()
  }
  const handleDeleteStudent = () => {
    showModal()
  }

  return (
    <div className="demo-loadmore-list">
      <Typography style={{ marginBottom: 20 }}>
        <Logo />
        <span style={{ fontSize: 20 }}>Danh sách bài tập:</span>
      </Typography>
      <div style={{ fontSize: 18, color: '#446EB1', marginBottom: 10 }} onClick={() => navigate('/teacher/manager-Course')}>
        {'<- Back'}
      </div>
      <div className="content-container">
        <div className="list-container">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.descrition}
                />
                {isRole == 1 && <Button style={{ marginRight: 10 }} type='primary'>Edit</Button>}
                {isRole == 1 && <Button style={{ marginRight: 10 }} onClick={() => {
                  setIsAddTestCase(true)
                  setIdExer(Number(item.id))
                  if( item.id) {
                    muationGetListTestCase.mutate(item.id)
                  }
                  showDrawer()
                
                }} >Thêm test case</Button>}
                {isRole == 1 && <Button type='primary' onClick={() => {
                  setIdExer(Number(item.id))
                  showModalStudent()
                }}><RestOutlined style={{ fontSize: 20 }} /></Button>}
              </List.Item>
            )}
          />
        </div>
        <div className="image-container">
          <Space direction="vertical" size={16}>
            <Card title={<div>
              <ContactsOutlined style={{ fontSize: 20, marginRight: 10 }} />
              Thông tin lớp học
            </div>} extra={isRole == 1 && <a onClick={() => {
              setIsAddTestCase(false)
              showDrawer()
            }}>Chỉnh sửa</a>} style={{ width: 500, marginBottom: 15 }}>
              <div>
                Tên lớp học :
              </div>
              <p style={{ fontSize: 20 }}>{course?.course_name}</p>
              <div>
                Giới thiệu :
              </div>
              <p style={{ fontSize: 20 }}>{course?.description}</p>
              <div>
                Mã bộ môn :
              </div>
              <p style={{ fontSize: 20 }}>{course?.code}</p>

            </Card>
          </Space>
          <span>
            <span>
              {isRole == 1 && <Button type='primary' style={{ margin: 15 }} onClick={() => {
                setAddEx(true);
                handleAddEx()
              }}>Thêm bài tập</Button>}
            </span>
            {/* <span>
              <Button >Danh Sach Sinh Vien</Button>
            </span> */}
            {isRole == 1 && <Button onClick={() => {
              setAddEx(false)
              showModal()
            }}>Xoá khoá học</Button>}
            <span>

            </span>
          </span>
          <Img1 />
        </div>
      </div>
      <Drawer title={isAddTestCase === true ? 'Thêm test case' : "Chỉnh sửa khoá học : "} onClose={onClose} open={open} width={700}>
        {isAddTestCase === true ? <TestCaseComponent isExer={idEx} listTestCase={listTestCase} mutation={muationGetListTestCase.mutate} setCloseDrawer={onClose} /> : <CreateCourse width={550} marginLeft={50} marginTop={30} course={course} />}
      </Drawer>
      <Modal title={addEx ? 'Thêm bài tập :' : 'Xác nhận việc xoá khoá học ?'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={addEx ? 750 : 500} footer={addEx ? null : undefined}>
        {addEx ? <CreateExam course_id={Number(id)} mutation={mutation.mutate} closePopup={handleCancel} isWidth={400} /> : <p>Bạn có chắc chắn muốn xoá khoá học này?</p>}
      </Modal>
      <Modal title='Xoá bài tập' open={isModalOpenDeleteStudent} onOk={handleOkStudent} onCancel={handleCancelStudent}>
        <p>Bạn có chắc chắn muốn xoá bài tập này ?</p>
      </Modal>
    </div>
  );
};

export default CourseDetail;
