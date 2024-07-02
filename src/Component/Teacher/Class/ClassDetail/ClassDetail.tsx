import React, { useEffect, useState } from 'react';
import { useMutation } from "react-query";
import { getListUserinClass, getDetailClass, getAllStudent, addUsertoClass, getListExam, getDetailExam, deleteExam, getListSubmissions } from '../../../../inqueryFetch/classManager';
import { Button, message, Avatar } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Drawer, List, Input, Modal } from 'antd';
import { RestOutlined, TeamOutlined } from '@ant-design/icons';
import './ClassDetail.scss'
import { Class, Exam, Student, StudentScore } from '../../../../Type/Exercise';
import { ReactComponent as Img } from './check-in-svgrepo.svg'
import ListStudent from './ListStudent/ListStudent';
import { ReconciliationOutlined, FileProtectOutlined, ArrowLeftOutlined, PlusCircleOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';
import { TagOutlined, HighlightOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useGlobalContext } from '../../../../Context';
import { UseMutationResult } from 'react-query';


const ClassDetail = () => {
    const { setCourseId, isRole } = useGlobalContext()
    const [open, setOpen] = React.useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenExam, setIsModalOpenExam] = useState(false);
    const [students, setListStudent] = useState<Student[]>([]);
    const [detailClass, setClass] = useState<Class>();
    const [allStudent, setAllStudent] = useState<Student[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(allStudent);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [nameStudent, setName] = useState('');
    const [idUser, setIdUser] = useState(0);
    const [listEx, setListEx] = useState<Exam[]>([]);
    const [isExam, setIsExam] = useState(false)
    const [idExam, setIdExam] = useState(0)
    const [isExamDrawerOpen, setIsExamDrawerOpen] = useState(false);
    const [listSubmis, setListSubmis] = useState<StudentScore[]>([])

    const navigate = useNavigate();
    const { id } = useParams();

    const mutationGetUser = useMutation(getListUserinClass, {
        onSuccess: (data) => {
            message.success('Lấy thông tin thành công');
            setListStudent(data);
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể lấy thông tin');
        }
    });

    const mutationGetAllStudent = useMutation(getAllStudent, {
        onSuccess: (data) => {
            // message.success('Lấy thông tin thành công');
            setAllStudent(data);
            console.log(data);
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể lấy thông tin');
        }
    });

    const mutaGetDetailClass = useMutation(getDetailClass, {
        onSuccess: (data) => {
            // message.success('Lấy thông tin thành công');
            setClass(data);
            setCourseId(data.course_id)
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể lấy thông tin');
        }
    });

    const mutaAddStudentToClass = useMutation(addUsertoClass, {
        onSuccess: (data) => {
            mutationGetUser.mutate(Number(id));
            message.success('Thêm học sinh thành công');
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể thêm học sinh');
        }
    });

    const mutaGetListExam = useMutation(getListExam, {
        onSuccess: (data) => {
            setListEx(data);
            // message.success('Lấy danh sách bài kiểm tra thành công');
        },
        onError: (error) => {
            console.error('Error fetching exam list:', error);
            message.error('Không thể lấy danh sách bài kiểm tra');
        }
    });
    const mutaGetDetailExam: UseMutationResult<Exam, Error, number> = useMutation(getDetailExam, {
        onSuccess: (data) => {
            // Ensure setExamDetail is defined before calling it
            // if (setExamDetail) {
            //     setExamDetail(data);
            //     // message.success('Lấy danh sách bài kiểm tra thành công');
            // }
        },
        onError: (error) => {
            console.error('Error fetching exam list:', error);
            // message.error('Không thể lấy danh sách bài kiểm tra');
        }
    });

    const mutaDeleteExam = useMutation(deleteExam, {
        onSuccess: (data) => {
            message.success('Xoá bài kiểm tra thành công');
            mutaGetListExam.mutate(Number(id))
        },
        onError: (error) => {
            console.error('Error fetching exam list:', error);
            // message.error('Không thể lấy danh sách bài kiểm tra');
        }
    });
    const mutaGetListSubmission = useMutation(getListSubmissions, {
        onSuccess: (data) => {
            // message.success('Lấy danh sách bài kiểm tra thành công');
            setListSubmis(data)
        },
        onError: (error) => {
            console.error('Error fetching exam list:', error);
            message.error('Không thể lấy danh sách bài kiểm tra');
        }
    });

    const showLoading = () => {
        setOpen(true);
    };

    const showModal = (userId: number) => {
        if (students.length === 0) {
            setIsModalOpen(true);
            return;
        }

        const studentExists = students.some(student => student.user_id === userId);
        if (studentExists) {
            message.error('Đã có học sinh này trong lớp !');
            setIsModalOpen(false);
        } else {
            setIsModalOpen(true);
        }
    };

    const handleOk = () => {
        mutaAddStudentToClass.mutate({ class_id: Number(id), user_id: idUser });
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModalExam = (examId?: number) => {
        if (examId) {
            setIdExam(examId)
        }
        setIsModalOpenExam(true)
    };

    const handleOkExam = () => {
        mutaDeleteExam.mutate(idExam)
        setIsModalOpenExam(false);
    };

    const handleCancelExam = () => {
        setIsModalOpenExam(false);
    };

    const handleSearchBlur = () => {
        const value = searchValue.toLowerCase();
        const filtered = allStudent.filter(student =>
            student.username.toLowerCase().includes(value) ||
            student.fullname.toLowerCase().includes(value)
        );
        setFilteredStudents(filtered);
        setIsSearchActive(value !== '');
    };

    const showExamDrawer = () => {
        setIsExamDrawerOpen(true);
    };

    const closeExamDrawer = () => {
        setIsExamDrawerOpen(false);
    };

    const handleEdit = (examId: number) => {
        console.log('Zoe click');
        console.log('Exam ID:', examId);
        // mutaGetDetailExam.mutate(examId)
        navigate(`/class/${id}/exam/${examId}`)

    }
    console.log('Zoe check', listEx)

    useEffect(() => {
        mutaGetListExam.mutate(Number(id));
        mutationGetUser.mutate(Number(id));
        mutaGetDetailClass.mutate(Number(id));
        mutationGetAllStudent.mutate();
        mutaGetDetailExam.mutate(2)
    }, [id]);

    return (
        <div style={{ display: 'flex' }} className='container1'>
            {isRole == 1 &&
                <Card className='card' title={<div> <Button type='link' onClick={() => navigate(-1)}><ArrowLeftOutlined /> Trở lại</Button><TeamOutlined style={{ fontSize: 20 }} />  Danh Sách Học Sinh :</div>} bordered={true}>
                    <ListStudent listStudent={students} class_id={Number(id)} mutation={mutationGetUser.mutate} />
                </Card>
            }
            {isRole != 1 &&
                <Card className='card' title={<div> <Button type='link' onClick={() => navigate(-1)}><ArrowLeftOutlined /> Trở lại</Button><TeamOutlined style={{ fontSize: 20 }} />  Danh sách bài kiểm tra :</div>} bordered={true}>
                    <List
                        dataSource={listEx}
                        renderItem={(exam, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png`} />}
                                    title={exam.name}
                                    description={
                                        <span>
                                            <span>{moment(exam.start_date).format('DD/MM/YYYY')}</span>
                                            <span> - {moment(exam.end_date).format('DD/MM/YYYY')}</span>
                                            <span style={{ float: 'right' }}>
                                                <Button type='primary' onClick={() => {
                                                    navigate(`/class-submission/${exam.class_id}/exam/${exam.id}`)
                                                }}>Chi tiết</Button>
                                            </span>
                                        </span>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            }
            <div>
                <Card
                    title={<div style={{ backgroundColor: '#746AB0', color: 'white', padding: '10px 30px', borderRadius: '4px', fontSize: '18px' }}>
                        <ReconciliationOutlined style={{ fontSize: 25, marginRight: '8px' }} /> Thông tin lớp học
                    </div>}
                    bordered={true}
                    style={{ width: 450, marginLeft: 20 }} 
                >
                    <p style={{ fontSize: 17, marginTop: -10 }}>
                        <h4> <TagOutlined /> Tên lớp học : {detailClass?.name}　</h4>
                    </p>
                    <p style={{ fontSize: 17, marginTop: -10 }}>
                        <h4> <TagOutlined /> Ngày bắt đầu :  <span> {moment(detailClass?.start_date).format('DD/MM/YYYY')}</span></h4>
                    </p>
                    <p style={{ fontSize: 20, marginLeft: 30 }}></p>
                    <p style={{ fontSize: 17, marginTop: -10 }}>
                        <h4><TagOutlined /> Ngày kết thúc : {moment(detailClass?.end_date).format('DD/MM/YYYY')}</h4>
                    </p>
                    <p style={{ fontSize: 17, marginTop: -10 }}>
                        <h4><TagOutlined /> Số lượng học sinh : {40}</h4>
                    </p>
                </Card>

                {isRole == 1 && <span>
                    <Button style={{ marginTop: 40 }} type='primary' onClick={showLoading} >Thêm học sinh</Button>
                    <Button style={{ marginLeft: 15 }} onClick={() => navigate(`/class/${id}/list-exam`)}> <FileProtectOutlined />Tạo bài kiểm tra </Button>
                    <Button style={{ marginLeft: 15 }} onClick={showExamDrawer} type='primary'> Danh sách bài kiểm tra </Button>

                </span>

                }

                <Img />
                <Drawer
                    closable
                    destroyOnClose
                    title={<p>Thêm học sinh vào lớp học :</p>}
                    placement="right"
                    open={open}
                    onClose={() => setOpen(false)}
                    width={600}
                >
                    <Input
                        placeholder="Search students"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onBlur={handleSearchBlur}
                        style={{ marginBottom: '20px' }}
                    />
                    <div style={{ height: '90%', overflowY: 'auto' }}>
                        <List
                            dataSource={isSearchActive ? filteredStudents : allStudent}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={<a href="https://ant.design">{item.username}</a>}
                                        description={
                                            <span>
                                                <span>{item.fullname}</span>
                                                <span style={{ float: 'right' }}>
                                                    <Button type="primary"
                                                        onClick={() => {
                                                            console.log('Zoe click here');
                                                            showModal(item.user_id);
                                                            setName(item.username);
                                                            setIdUser(item.user_id);
                                                        }}
                                                    >
                                                        <PlusCircleOutlined style={{ fontSize: 20 }} />
                                                        <span style={{ marginTop: -10 }}>Thêm</span>
                                                    </Button>

                                                </span>
                                            </span>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Drawer>
                {/* // Danh sách bài kiểm tra */}
                <Drawer
                    closable
                    destroyOnClose
                    title={<p>Danh sách bài kiểm tra</p>}
                    placement="right"
                    open={isExamDrawerOpen}
                    onClose={closeExamDrawer}
                    width={700}
                >
                    <div style={{ height: '90%', overflowY: 'auto' }}>
                        <List
                            dataSource={listEx}
                            renderItem={(exam, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={`https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png`} />}
                                        title={exam.name}
                                        description={
                                            <span>
                                                <span>{moment(exam.start_date).format('DD/MM/YYYY')}</span>
                                                <span> - {moment(exam.end_date).format('DD/MM/YYYY')}</span>
                                                <span style={{ float: 'right' }}>
                                                    <Button type='primary' style={{ marginRight: 10 }} title='Chỉnh sửa' onClick={() => {
                                                        handleEdit(exam.id)
                                                    }} ><HighlightOutlined style={{ fontSize: 20 }} /></Button>
                                                    <Button style={{ marginRight: 10 }} onClick={() => navigate(`/class/${id}/exam/${exam.id}/submission`)}> Danh sách nộp bài </Button>
                                                    <Button type='primary' title='Xoá bài kiểm tra' onClick={() => {
                                                        showModalExam(exam.id)
                                                    }}><RestOutlined style={{ fontSize: 20 }} /></Button>
                                                </span>
                                            </span>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Drawer>

                <Modal
                    title={`Xác nhận việc thêm học sinh : ${nameStudent} vào lớp học ?`}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Bạn có chắc chắn muốn thêm học sinh này?</p>
                </Modal>
                <Modal
                    title={`Xác nhận việc xoá bài kiểm tra`}
                    open={isModalOpenExam}
                    onOk={handleOkExam}
                    onCancel={handleCancelExam}
                >
                    <p>Bạn có chắc chắn muốn xoá khoá học này ?</p>
                </Modal>
            </div>
        </div>
    );
};

export default ClassDetail;
