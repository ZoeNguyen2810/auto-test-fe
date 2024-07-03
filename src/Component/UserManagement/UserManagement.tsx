import React, { useEffect, useState } from 'react';
import { Button, Table, Drawer, message, Modal } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import './UserManagement.scss';
import { useMutation } from 'react-query';
import { deleteUser, getListUser } from '../../inqueryFetch/classManager';
import { FilterOutlined } from '@ant-design/icons';
import SignIn from '../Auth/SignUp/SignUp';
import Item from 'antd/es/list/Item';

interface Users {
    id: number;
    username: string;
    fullname: string;
    role: number;
    enabled: boolean;
}

interface DataType {
    key: React.Key;
    name: string;
    fullname: string;
    role: string;
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
};

const UserManagement = () => {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [users, setUsers] = useState<Users[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<DataType[]>([]);
    const [ idUser , setIdUser] = useState(0)

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    

    const mutationGetUsers = useMutation(getListUser, {
        onSuccess: (data) => {
            // Ensure the data is an array
            if (Array.isArray(data)) {
                setUsers(data);
                setFilteredUsers(mapUsersToDataType(data));
            } else {
                console.error('Fetched data is not an array:', data);
                message.error('Fetched data is not an array');
            }
        },
        onError: (error) => {
            console.error('Error fetching users:', error);
            message.error('Failed to fetch users');
        }
    });
    const mutationDeleteUsers = useMutation( deleteUser, {
        onSuccess: (data) => {
            mutationGetUsers.mutate()
           
        },
        onError: (error) => {
          
        }
    });

    useEffect(() => {
        mutationGetUsers.mutate();
    }, []);

    const getRoleName = (role: number): string => {
        switch (role) {
            case 1:
                return 'Admin';
            case 2:
                return 'Giáo viên';
            case 3:
                return 'Học viên';
            default:
                return 'Unknown';
        }
    };

    const mapUsersToDataType = (users: Users[]): DataType[] => {
        return users.map(user => ({
            key: user.id,
            name: user.username,
            fullname: user.fullname,
            role: getRoleName(user.role),
        }));
    };

    const filterUsersByRole = (role: string) => {
        if (role === 'All') {
            setFilteredUsers(mapUsersToDataType(users));
        } else {
            const filtered = mapUsersToDataType(users).filter(user => user.role === role);
            setFilteredUsers(filtered);
        }
    };

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value as string),
            width: '300px',
        },
        {
            title: 'Tên đầy đủ',
            dataIndex: 'fullname',
            width: '400px'
        },
        {
            title: 'Vị trí',
            dataIndex: 'role',
            filterSearch: true,
            width: '300px',
        },
        {
            title: 'Actions',
            key: 'id',
            render: (_, record) => (
                <span>
                    <Button type="link" onClick={() => {
                        setIsEdit(true);
                        setIdUser(Number(record.key))
                        showDrawer();
                    }}>Edit</Button>
                    <Button type="link" danger onClick={() => { showModal();
                        setIdUser(Number(record.key))
                        
                     }}>Delete</Button>
                </span>
            ),
        },
    ];

    const handleEdit = (record: DataType) => {
        // handle edit logic here
    };

    const handleDelete = (record: DataType) => {
        // handle delete logic here
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        mutationDeleteUsers.mutate(idUser)
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    console.log(isEdit);
    

    return (
        <div className='container-table'>
            <h3>Danh Sách Người Dùng </h3>

            <span style={{ display: 'flex', cursor: 'pointer' }}>
                <Button type='primary' style={{ marginTop: 10 }} onClick={() => {
                    setIsEdit(false);
                    showDrawer();
                }}>Thêm người dùng</Button>
                <h4 style={{ marginRight: 30, marginLeft: 30, cursor: 'pointer' ,}} onClick={() => filterUsersByRole('All')}><FilterOutlined /> Tất cả</h4>
                <h4 style={{ marginRight: 30, marginLeft: 30, cursor: 'pointer' }} onClick={() => filterUsersByRole('Giáo viên')}><FilterOutlined /> Giáo Viên</h4>
                <h4 style={{ marginRight: 30, cursor: 'pointer' }} onClick={() => filterUsersByRole('Admin')}><FilterOutlined /> Quản trị viên</h4>
                <h4 style={{ marginRight: 30, cursor: 'pointer' }} onClick={() => filterUsersByRole('Học viên')}><FilterOutlined /> Học Viên</h4>
            </span>

            <Table columns={columns} dataSource={filteredUsers} onChange={onChange} pagination={{ pageSize: 10 }} />
            <Drawer title={isEdit ? 'Sửa thông tin người dùng' : "Thêm người dùng"} onClose={onClose} open={open} width={700}>
                <SignIn userInfo={idUser} isEdit={isEdit} closeDrawer={onClose} setListUser={mutationGetUsers.mutate} />
            </Drawer>
            <Modal title="Xác nhận việc xoá người dùng ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn xoá người dùng này ?</p>
            </Modal>
        </div>
    );
};

export default UserManagement;
