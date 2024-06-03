import React, { useState } from 'react';
import { Table, Modal, Form, Input, Button } from 'antd';

interface Student {
    id: number;
    name: string;
    age: number;
    address: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
}

interface Props {
    students?: Student[];
}

const StudentTable: React.FC<Props> = ({ students }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentStudent, setCurrentStudent] = useState<Student | null>(null);

    const studentsEx = [
        {
            id: 1,
            name: 'John Doe',
            age: 20,
            address: '123 Main St',
            email: 'john@example.com',
            phoneNumber: '123-456-7890',
            dateOfBirth: '2000-01-01',
        },
        {
            id: 2,
            name: 'Jane Smith',
            age: 22,
            address: '456 Elm St',
            email: 'jane@example.com',
            phoneNumber: '987-654-3210',
            dateOfBirth: '1998-05-15',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            age: 21,
            address: '789 Oak St',
            email: 'alice@example.com',
            phoneNumber: '555-555-5555',
            dateOfBirth: '1999-09-30',
        },
        // Thêm dữ liệu sinh viên khác nếu cần
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, record: Student) => (
                <Button onClick={() => handleEdit(record)}>Edit</Button>
            ),
        },
    ];

    const handleEdit = (student: Student) => {
        setCurrentStudent(student);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>


            <h1 style={{ marginLeft: 250 }}>List Student :</h1>
            <Button type="primary" htmlType="submit" style={{ marginTop: 2 , marginBottom : 10 , marginLeft : 250}}>
                Add Student
            </Button>
            <Table dataSource={studentsEx} columns={columns} />
            <Modal
                title="Edit Student"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {currentStudent && (
                    <Form
                        initialValues={currentStudent}
                        onFinish={(values) => {
                            console.log('Updated student:', values);
                            setIsModalVisible(false);
                        }}
                    >
                        <Form.Item label="Name" name="name">
                            <Input style={{ marginLeft: 70, width: 300 }} />
                        </Form.Item>
                        <Form.Item label="Age" name="age">
                            <Input style={{ marginLeft: 80, width: 300 }} />
                        </Form.Item>
                        <Form.Item label="Address" name="address">
                            <Input style={{ marginLeft: 57, width: 300 }} />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input style={{ marginLeft: 73, width: 300 }} />
                        </Form.Item>
                        <Form.Item label="Phone Number" name="phoneNumber">
                            <Input style={{ marginLeft: 10, width: 300 }} />
                        </Form.Item>
                        <Form.Item label="Date of Birth" name="dateOfBirth">
                            <Input style={{ marginLeft: 24, width: 300 }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginLeft: '40%' }}>
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default StudentTable;
