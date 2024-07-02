import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TestCase, TestCaseData } from '../../../Type/Exercise';
import { Form, Input, Button, message, Modal, List, Avatar } from 'antd';
import { createTestCase, deleteTestCase, getListTestCase } from '../../../inqueryFetch/classManager';
import { useMutation } from 'react-query';
import { idText } from 'typescript';
const { TextArea } = Input;
type Props = {
    isExer?: number
    listTestCase: TestCaseData[]
    mutation: (isExer: number) => void;
    setCloseDrawer: () => void
}

const TestCaseComponent: React.FC<Props> = ({ isExer, listTestCase, mutation, setCloseDrawer }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<TestCase>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idTestCase, setIsTestCase] = useState(0)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModalDelete = () => {
        setIsModalOpenDelete(true);
    };

    const handleOkDelet = () => {
        mutationDeleteTestCase.mutate(idTestCase)
        setIsModalOpenDelete(false);
        setCloseDrawer()
    };

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const handleCancelDelete = () => {

        setIsModalOpenDelete(false);
    };

    const muationCreateTestCase = useMutation(createTestCase, {
        onSuccess: (data) => {
            message.success('Tạo thành công');
            // setIsAddTestCase(false)
        },
        onError: (error) => {
            console.error('Error creating user:', error);
            message.error('Tạo không thành công');
        }
    })
    const mutationDeleteTestCase = useMutation(deleteTestCase, {
        onSuccess: (data) => {
            // setIsAddTestCase(false)
        },
        onError: (error) => {
            console.error('Error creating user:', error);
        }
    })

    const handleOnSubmit = (data: TestCase) => {
        // Handle form submission
        if (isExer) {
            data.exercise_id = isExer
            muationCreateTestCase.mutate(data)
            mutation(isExer)
            reset()

            handleCancel()
            setCloseDrawer()
        }
    };

    useEffect(() => {
        if (isExer) {
            // muationGetListTestCase.mutate(Number(isExer))
        }
    }, [])


    return (
        <div>
            <span style={{ display: 'flex' }}>
                <h3>Danh sách test case</h3>
                <Button type='primary' onClick={showModal} style={{ marginLeft: 350, marginTop: 15 }}>Thêm test case</Button>
            </span>

            <List
                itemLayout="horizontal"
                dataSource={listTestCase}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg`} />}
                            title={<a href="https://ant.design">{`Test Case số ${index + 1}`}</a>}
                            description={<div>
                                <h4> Input - {item.input}</h4>
                                <h4> Output - {item.output}</h4>
                            </div>}
                        />
                        <h4>Run time - {item.run_time}   <Button>Sửa</Button> <Button type='primary' style={{ marginLeft: 10 }} onClick={() => {
                            setIsTestCase(item.id)
                            showModalDelete()
                        }}>Xoa</Button></h4>

                    </List.Item>

                )}
            />
            <Modal title="Confirm delete test case " open={isModalOpenDelete} onOk={handleOkDelet} onCancel={handleCancelDelete}>
                <p>Ban co chac chan muon xoa test case nay ?</p>
            </Modal>

            <Modal title="Thêm test case" open={isModalOpen} footer={false} onCancel={handleCancel}>
                <Form
                    layout="vertical"
                    onFinish={handleSubmit(handleOnSubmit)}
                    className="Additem"
                    style={{ width: '100%', marginLeft: -170 }}
                >
                    <Form.Item
                        label="Input"
                        validateStatus={errors.test_cases?.input ? 'error' : ''}
                        required
                        help={errors.test_cases?.input ? errors.test_cases.input.message : ''}
                        style={{ width: 400, marginLeft: 200 }}
                    >
                        <Controller
                            control={control}
                            name="test_cases.input"
                            rules={{
                                required: 'Khong duoc bo trong',
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Output"
                        validateStatus={errors.test_cases?.output ? 'error' : ''}
                        required
                        help={errors.test_cases?.output ? errors.test_cases.output.message : ''}
                        style={{ width: 400, marginLeft: 200 }}
                    >
                        <Controller
                            control={control}
                            name="test_cases.output"
                            rules={{
                                required: 'Khong duoc bo trong',
                            }}
                            render={({ field }) => <Input {...field} />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Timeout"
                        validateStatus={errors.test_cases?.run_time ? 'error' : ''}
                        required
                        help={errors.test_cases?.run_time ? errors.test_cases.run_time.message : ''}
                        style={{ width: 400, marginLeft: 200 }}
                    >
                        <Controller
                            control={control}
                            name="test_cases.run_time"
                            rules={{
                                required: 'Khong duoc bo trong',
                            }}
                            render={({ field }) => <Input {...field} type="number" />}
                        />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" style={{ marginLeft: '70%', marginTop: 30 }}>
                        Tạo bài tập
                    </Button>
                </Form>
            </Modal>


        </div>
    );
};

export default TestCaseComponent;

