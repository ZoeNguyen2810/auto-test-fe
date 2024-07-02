import React, { useEffect, useState } from 'react';
import { Card, Input, Button, message, Upload, Drawer, Modal, Form, Select } from 'antd';
import { CodeOutlined, FileTextOutlined, ExperimentOutlined, TagOutlined, InboxOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';
import { createSubmission, getDetailClass, getDetailExam, getListExercise, getDetailSubmissionFile, getDetailSubmission, createSubmissionByPostString } from '../../../../inqueryFetch/classManager';
import { useParams, useNavigate } from 'react-router-dom';
import { Class, Exam, Exercises, Submission, SubmissionByString } from '../../../../Type/Exercise';
import './Description.scss';
import { ReactComponent as IconSVG } from './availability-svgrepo-com.svg';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SubmisType } from '../../../../Type/Exercise';
import imgLogo from './Animation - 1719056537288.gif'
import { DrawerProps } from 'antd';
import ChatBox from '../../ChatBox';
import { useForm, Controller } from 'react-hook-form';
import Chart from './Chart/Chart';

interface ExerciseStatus {
    questions_id: number;
    exercise_id: number;
    submitted: string;
}


const { Dragger } = Upload;
const { TextArea } = Input;

export const Description = () => {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<SubmissionByString>();
    const navigate = useNavigate();
    const { id, examId } = useParams();
    const [exam, setExam] = useState<Exam>();
    const [listExer, setListExer] = useState<Exercises[]>([]);
    const [classDetail, setClassDetail] = useState<Class>();
    const [listArrayExer, setListArray] = useState<Array<ExerciseStatus>>([]);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const userId = localStorage.getItem('userId');
    const [exerName, setExerName] = useState('')
    const [submissionDetail, setSubmissionDetail] = useState<SubmisType>();
    const [exerId, setExerId] = useState(0)
    const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
    const [open, setOpen] = useState(false);
    const [submissionFile, setSubmissionFile] = useState('');
    const [isChatModalVisible, setIsChatModalVisible] = useState(false); // State to manage chat modal visibility


    const mutationGetDetailSubmissionFile = useMutation(getDetailSubmissionFile, {
        onSuccess: (data) => setSubmissionFile(data),
        onError: (error) => console.error('Error fetching submission file:', error)
    });
    const onClose = () => setOpen(false);
    const mutaGetDetailClass = useMutation(getDetailClass, {
        onSuccess: (data) => {
            setClassDetail(data);
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
        }
    });

    const mutationGetDetailExam = useMutation(getDetailExam, {
        onSuccess: (data) => {
            setExam(data.exam);
            setListArray(data.exercise_ids);
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
        }
    });

    const mutationGetListExer = useMutation(getListExercise, {
        onSuccess: (data) => {
            setListExer(data);
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
        }
    });
    const mutationGetDetailSubmission = useMutation(getDetailSubmission, {
        onSuccess: (data) => setSubmissionDetail(data),
        onError: (error) => console.error('Error fetching submission detail:', error)
    });
    const mutationCreateSubmissionByString = useMutation(createSubmissionByPostString, {
        onSuccess: (data) => { },
        onError: (error) => console.error('Error fetching submission detail:', error)
    });


    const mutationUpdateSubmission = useMutation(createSubmission, {
        onSuccess: (data) => {
            // Handle successful submission
        },
        onError: (error) => {
            console.error('Error submitting data:', error);
        }
    });



    const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    useEffect(() => {
        mutationGetDetailExam.mutate(Number(examId));
        mutaGetDetailClass.mutate(Number(id));
    }, []);

    useEffect(() => {
        if (classDetail?.course_id !== undefined) {
            mutationGetListExer.mutate(Number(classDetail.course_id));
        }
    }, [classDetail]);

    const listExercise = listExer.filter(exercise =>
        listArrayExer && listArrayExer.some(item => item.exercise_id === exercise.id)
    );
    console.log('Zoe listExercise', listExercise);
    console.log('Zoe listArrayExer', listArrayExer);


    const showDrawer = (submissionId: string) => {
        mutationGetDetailSubmissionFile.mutate(submissionId)
        mutationGetDetailSubmission.mutate(submissionId)
        setOpen(true)

    };
    console.log(listExer);
    console.log('Zoe listArrayExer', listArrayExer);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };





    // Handle submit function
    const handleSubmitStudents = (data: SubmissionByString) => {

        if (!data.source_code && !file) {
            message.error('Bạn cần nhập code hoặc tải lên file ')
            return
        }
        if (data.source_code && file) {
            message.error('Bạn chỉ được nhập code hoặc tải lên file trong 1 lần nộp !')
            return;
        }
        console.log(file);
        if (file) {
            const formData = new FormData();
            formData.append("data_file", file);
            formData.append("student_id", String(userId));
            formData.append("class_id", String(id)); // Convert to string
            formData.append("exercise_id", String(exerId));
            formData.append("exam_id", String(examId)); // Convert to string
            formData.append("description", description);
            // Mutation or API call to submit the form
            mutationUpdateSubmission.mutate(formData);
            mutationGetDetailExam.mutate(Number(examId))
            reset()
            return
        }

        if (data.source_code) {
            data.class_id = Number(id)
            data.exam_id = Number(examId)
            data.description = description
            data.exercise_id = Number(exerId)

            mutationCreateSubmissionByString.mutate(data)
            mutationGetDetailExam.mutate(Number(examId))
            reset()


        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    console.log('Zoe submissionDetail', submissionDetail);

    // Function to handle showing the chat modal
    const showChatModal = () => {
        setIsChatModalVisible(true);
    };

    // Function to handle closing the chat modal
    const handleChatModalClose = () => {
        setIsChatModalVisible(false);
    };

    return (
        <span style={{ display: 'flex' }} className='containerSubmit'>
            <span style={{ marginRight: 30 }}>
                <Card title={
                    <>
                        <Button type='primary' onClick={() => navigate(-1)}>Trở lại</Button>
                        -- {exam?.name}
                    </>
                } bordered={true} className='card' style={{ marginRight: 20 }}>
                    <span style={{ display: 'flex', marginBottom: 450 }}>
                        <span style={{ fontSize: 17 }}><FileTextOutlined style={{ color: 'green' }} /> Description</span>
                        <span style={{ fontSize: 17, marginLeft: 10 }}><ExperimentOutlined style={{ color: 'green' }} /> Solution</span>
                        <span style={{ fontSize: 17, marginLeft: 10 }}><TagOutlined style={{ color: 'green' }} /> Solution</span>
                    </span>
                    <h4 style={{ fontSize: 17, float: 'left', marginTop: -430 }}>Lớp học - {classDetail?.name}</h4>
                    <div style={{ marginTop: -400, fontSize: 16 }}>
                        Mô Tả - {exam?.description}
                    </div>
                    <div>
                        Thời gian: {exam?.start_date ? new Date(exam?.start_date).toLocaleDateString() : ''} - {exam?.end_date ? new Date(exam?.end_date).toLocaleDateString() : ''}
                    </div>
                    <h4>Bài Tập</h4>
                    {
                        listExercise.map((item) => {
                            const isSubmitted = listArrayExer && listArrayExer.filter((exer) => exer.exercise_id === item.id)
                            console.log('Zoe is a submitted exercise', isSubmitted);

                            return (
                                <div key={item.id}>
                                    <h5 style={{ fontSize: 13, cursor: 'pointer' }} onClick={() => {
                                        setExerName(item.name ? item.name : '')
                                        setExerId(item.id ? item.id : 0)
                                    }}>{item.name}
                                        {isSubmitted[0].submitted &&
                                            <div style={{}}> <CheckCircleOutlined style={{ marginLeft: 0, fontSize: 22, color: '#1677ff' }} />
                                                <Button type='link' onClick={() => {
                                                    showDrawer(isSubmitted[0].submitted)
                                                }}>Chi Tiết bài tập</Button></div>}
                                    </h5>
                                    <div style={{ fontSize: 14 }}>{item.description}</div>

                                </div>
                            )
                        })
                    }
                </Card>
            </span>
            <span>
                <Card title={<div style={{ fontSize: 20, float: 'right' }}><CodeOutlined style={{ color: "green" }} /> Code C/C++</div>} bordered={false} className='card1'>
                    <div style={{ marginLeft: 15, width: 600, marginBottom: 20, marginTop: -50 }}>
                        <h4>Mô Tả</h4>
                        <Input onChange={onChangeDescription} value={description} />
                    </div>

                    <Form layout='vertical' onFinish={handleSubmit(handleSubmitStudents)} >
                        {/* <img src={logo} alt="loading..." style={{ marginLeft: '23%', fontSize: '30px' }} /> */}
                        <Form.Item
                            label="Ngôn ngữ"
                            validateStatus={errors.language ? 'error' : ''}
                            required
                            help={errors.language ? errors.language.message : ''}
                            style={{ width: 590, marginLeft: 15 }}
                        >
                            <Controller
                                control={control}
                                name='language'
                                // defaultValue=''
                                rules={{
                                    maxLength: {
                                        value: 255,
                                        message: "Độ dài tối đa 255 kí tự"
                                    }
                                }}
                                render={({ field }) => (
                                    <Select {...field}>
                                        <Select.Option value={'C'}> Ngôn ngữ C</Select.Option>
                                        <Select.Option value={'C++'}>Ngôn ngữ C++</Select.Option>
                                    </Select>
                                )}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Bài Nộp"
                            validateStatus={errors.source_code ? 'error' : ''}
                            required
                            help={errors.source_code ? errors.source_code.message : ''}
                            style={{ width: 590, marginLeft: 15 }}
                        >
                            <Controller
                                control={control}
                                name='source_code'
                                defaultValue=''
                                rules={{
                                    maxLength: {
                                        value: 100000,
                                        message: "Độ dài tối đa 8 kí tự"
                                    }
                                }}
                                render={({ field }) => <TextArea rows={16} {...field} />}
                            />
                        </Form.Item>
                        <div>
                            <label htmlFor="file" className="sr-only">
                                <InboxOutlined style={{ fontSize: 30, color: '#1677ff' }} /> Hãy chọn 1 tệp
                            </label>
                            <input id="file" type="file" onChange={handleFileChange} />
                        </div>
                        {file && (
                            <section>
                                <h4>File details:</h4>
                                <ul>
                                    <li>Name: {file.name}</li>
                                    <li>Type: {file.type}</li>
                                    <li>Size: {file.size} bytes</li>
                                </ul>
                            </section>
                        )}
                        <Form.Item>
                            <Button type='primary' htmlType='submit' style={{ marginLeft: '45%' }}>{`Nộp bài ${exerName}`}</Button>
                        </Form.Item>

                        {/* <span style={{ marginLeft: 20, fontSize: 20 }} onClick={handleSubmitStudents}>
                            <Button type='primary'>{`Nộp bài ${exerName}`}</Button>
                        </span> */}
                    </Form>



                </Card>
                {/* <span style={{ display: 'flex' }}>
                    <IconSVG style={{ marginLeft: 150 }} />
                </span> */}
                <img src={imgLogo} alt="loading..." style={{ fontSize: '20px', float: 'right', marginTop: -230, cursor: 'pointer', backgroundColor: 'white', position: 'fixed', marginLeft: 500, borderRadius: '50%' }} onClick={showChatModal} />

            </span>
            <Drawer
                title="Chi tiết bài làm"
                placement={placement}
                closable={false}
                onClose={onClose}
                open={open}
                key={placement}
                width={700}
            >
                <p> {!submissionFile && 'Loading...'}</p>
                <h4>Mô tả : </h4>
                <span>{submissionDetail?.description}</span>
                <h4> Điểm : {submissionDetail?.score}</h4>
                <SyntaxHighlighter language="c" style={dark}>
                    {submissionFile}
                </SyntaxHighlighter>
            </Drawer>
            <Modal
                title="Hỗ trợ học viên"
                visible={isChatModalVisible}
                onCancel={handleChatModalClose}
                footer={null}
                style={{ top: 50, left: 300 }}
                width={700}
            >
                <ChatBox width={650} height={700} />
            </Modal>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Chart />
            </Modal>
        </span>
    );
}
