import React, { useState } from 'react';
import { Student } from '../../../../../Type/Exercise';
import { Avatar, Button, Input, List, Modal, message } from 'antd';
import { RestOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';
import { deleteUsertoClass } from '../../../../../inqueryFetch/classManager';

type Props = {
    listStudent: Student[];
    class_id: number;
    mutation: (class_id: number) => void;
};

const ListStudent: React.FC<Props> = ({ listStudent, class_id, mutation }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredStudents, setFilteredStudents] = useState(listStudent);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nameStudent, setName] = useState('');
    const [idUser, setIdUser] = useState(0);

    const mutaDelete = useMutation(deleteUsertoClass, {
        onSuccess: (data) => {
            message.success('Lấy thông tin thành công');
            mutation(class_id);
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể lấy thông tin');
        }
    });

    const handleSearchBlur = () => {
        const value = searchValue.toLowerCase();
        const filtered = listStudent.filter(student =>
            student.username.toLowerCase().includes(value) ||
            student.fullname.toLowerCase().includes(value)
        );
        setFilteredStudents(filtered);
        setIsSearchActive(value !== '');
    };

    const showModal = (name: string, userId: number) => {
        setName(name);
        setIsModalOpen(true);
        setIdUser(userId);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        mutaDelete.mutate(idUser);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Input
                placeholder="Search students"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onBlur={handleSearchBlur}
                style={{ marginBottom: '20px' }}
            />
            <List
                dataSource={isSearchActive ? filteredStudents : listStudent}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={<a href="https://ant.design">{item.username}</a>}
                            description={
                                <span>
                                    <span>{item.fullname}</span>
                                    <span style={{ float: 'right' }}>
                                        <Button type="primary" onClick={() => showModal(item.username, item.user_id)}>
                                            <RestOutlined style={{ fontSize: 22 }} />
                                        </Button>
                                    </span>
                                </span>
                            }
                        />
                    </List.Item>
                )}
            />
            <Modal
                title={`Xác nhận việc xoá học sinh ${nameStudent} khỏi lớp học ?`}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Bạn có chắc chắn muốn xoá học sinh này?</p>
            </Modal>
        </div>
    );
};

export default ListStudent;
