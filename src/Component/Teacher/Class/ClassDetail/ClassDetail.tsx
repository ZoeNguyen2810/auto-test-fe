import React, { useEffect, useState } from 'react';
import { useMutation } from "react-query";
import { getListUserinClass, getDetailClass, getAllStudent, addUsertoClass } from '../../../../inqueryFetch/classManager';
import { Button, message, Avatar } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Drawer, List, Input, Modal } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import './ClassDetail.scss'
import { Class, Student } from '../../../../Type/Exercise';
import { ReactComponent as Img } from './check-in-svgrepo.svg'
import ListStudent from './ListStudent/ListStudent';
import { ReconciliationOutlined, FileProtectOutlined, ArrowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { TagOutlined } from '@ant-design/icons';
import moment from 'moment';




const ClassDetail = () => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [students, setListStudent] = useState<Student[]>([])
    const [detailClass, setClass] = useState<Class>()
    const [allStudent, setAllStudent] = useState<Student[]>([])
    const [searchValue, setSearchValue] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(allStudent);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [nameStudent, setName] = useState('');
    const [idUser, setIdUser] = useState(0);

    const navigate = useNavigate()
    const mutationGetUser = useMutation(getListUserinClass, {
        onSuccess: (data) => {
            message.success('Lấy thông tin thành công');
            setListStudent(data)
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể lấy thông tin');
        }
    });
    const mutationGetAllStudent = useMutation(getAllStudent, {
        onSuccess: (data) => {
            message.success('Lấy thông tin thành công');
            setAllStudent(data)
            console.log(data);

        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể lấy thông tin');
        }
    });
    const mutaGetDetailClass = useMutation(getDetailClass, {
        onSuccess: (data) => {
            message.success('Lấy thông tin thành công');
            setClass(data)
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể lấy thông tin');
        }
    });
    const mutaAddStudentToClass = useMutation(addUsertoClass, {
        onSuccess: (data) => {
            mutationGetUser.mutate(Number(id))
            message.success('Thêm học sinh thành công');

        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể thêm học sinh');
        }
    });

    const showLoading = () => {
        setOpen(true);

        // Simple loading mock. You should add cleanup logic in real world.
    };
    const showModal = (name: string, userId: number) => {
        students.map((student) => {
            if (student.user_id === userId) {
                message.error('Đã có học sinh này trong lớp !')
                setIsModalOpen(false);
                return;
            }
            setIsModalOpen(true)
        })
        setName(name);
        setIdUser(userId)


    };

    const handleOk = () => {
        mutaAddStudentToClass.mutate({ class_id: Number(id), user_id: idUser })
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
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


    const { id } = useParams();
    useEffect(() => {
        mutationGetUser.mutate(Number(id));
        mutaGetDetailClass.mutate(Number(id));
        mutationGetAllStudent.mutate()

    }, []);

    return (
        <div style={{ display: 'flex' }} className='container1'>
            <Card className='card' title={<div> <Button type='link' onClick={() => navigate(-1)}><ArrowLeftOutlined /> Trở lại</Button><TeamOutlined style={{ fontSize: 20 }} />  Danh Sách Học Sinh :</div>} bordered={true}>
                <ListStudent listStudent={students} class_id={Number(id)} mutation={mutationGetUser.mutate} />
            </Card>
            <div >
                <Card title={<div><ReconciliationOutlined style={{ fontSize: 25 }} /> Thông tin lớp học</div>} bordered={true} style={{ width: 450, marginLeft: 20 }}>
                    <p style={{ fontSize: 17, marginTop: -10 }}>
                        <TagOutlined /> Tên lớp học : {detailClass?.name}
                    </p>
                    <p style={{ fontSize: 17, marginTop: -10 }}>
                        <TagOutlined /> Ngày bắt đầu :
                        <span style={{}}> {moment(detailClass?.start_date).format('DD/MM/YYYY')}</span>

                    </p>
                    <p style={{ fontSize: 20, marginLeft: 30 }}></p>
                    <p style={{ fontSize: 17, marginTop: -10 }}>
                        <TagOutlined /> Ngày kết thúc :{moment(detailClass?.end_date).format('DD/MM/YYYY')}
                    </p>
                    <p style={{ fontSize: 17, marginTop: -10 }}>
                        <TagOutlined /> Số lượng học sinh : {40}
                    </p>
                </Card>
                <Button style={{ marginLeft: 110, marginTop: 40 }} type='primary' onClick={showLoading}>Thêm học sinh</Button>
                <Button style={{ marginLeft: 15 }}> <FileProtectOutlined />Danh sách bài kiểm tra </Button>
                <Img />
                <Drawer
                    closable
                    destroyOnClose
                    title={<p>Thêm học sinh vào lớp học :</p>}
                    placement="right"
                    open={open}
                    // loading={loading}
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
                                                        onClick={() => showModal(item.username, item.user_id)}
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
                <Modal
                    title={`Xác nhận việc thêm học sinh : ${nameStudent} vào lớp học ?`}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Bạn có chắc chắn muốn thêm học sinh này?</p>
                </Modal>
            </div>
        </div>
    );
};

export default ClassDetail;
