import React, { useEffect, useState } from 'react';
import { Button, Table, Drawer, message, Modal } from 'antd';
import type { TableColumnsType, TableProps, } from 'antd';
import './UserManagement.scss';
import { useMutation } from 'react-query';
import { getListUsers } from '../../inqueryFetch/authFetch';
import { getListUser } from '../../inqueryFetch/classManager';
import { FilterOutlined } from '@ant-design/icons';
import SignIn from '../Auth/SignUp/SignUp';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}


const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '5',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '6',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '7',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '8',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    {
        key: '9',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '10',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '11',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '12',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const UserManagement = () => {
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ isEdit , setIsEdit] = useState(false)

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const mutationGetUsers = useMutation(getListUser, {
        onSuccess: (data) => {
            // handle success logic here
        },
        onError: (error) => {
            console.error('Error fetching users:', error);
            message.error('Failed to fetch users');
        }
    });

    useEffect(() => {
        // mutationGetUsers.mutate();
    }, []);
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Category 1',
                    value: 'Category 1',
                    children: [
                        {
                            text: 'Yellow',
                            value: 'Yellow',
                        },
                        {
                            text: 'Pink',
                            value: 'Pink',
                        },
                    ],
                },
                {
                    text: 'Category 2',
                    value: 'Category 2',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.includes(value as string),
            width: '30%',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value, record) => record.address.startsWith(value as string),
            filterSearch: true,
            width: '40%',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" onClick={() => {
                        setIsEdit(true)
                        showDrawer() }}>Edit</Button>
                    <Button type="link" danger onClick={() => { showModal() }}>Delete</Button>
                </span>
            ),
        },
    ];


    const handleEdit = (record: DataType) => {
        console.log('Edit record:', record);
        // handle edit logic here
    };

    const handleDelete = (record: DataType) => {
        console.log('Delete record:', record);
        // handle delete logic here
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='container-table'>
            <h3>Danh Sách Người Dùng </h3>

            <span style={{ display: 'flex', cursor: 'pointer' }}>
                <Button type='primary' style={{ marginTop: 10 }} onClick={() => {
                    setIsEdit(false)
                    showDrawer()
                }}>Thêm người dùng</Button>
                <h4 style={{ marginRight: 30, marginLeft: 30 }}><FilterOutlined /> Giáo Viên</h4>
                <h4 style={{ marginRight: 30 }}><FilterOutlined /> Học Viên</h4>
            </span>

            <Table columns={columns} dataSource={data} onChange={onChange} pagination={{ pageSize: 10 }} />;
            <Drawer title={isEdit ? 'Sửa thông tin người dùng' : "Thêm người dùng" } onClose={onClose} open={open} width={700}>
                <SignIn />
            </Drawer>
            <Modal title="Xác nhận việc xoá người dùng ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <p>Bạn có chắc chắn muốn xoá người dùng này ?</p>
            </Modal>
        </div>
    );
};

export default UserManagement;
