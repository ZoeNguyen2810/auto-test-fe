import React, { useEffect, useState } from 'react';
import './Submission.scss';
import { useMutation } from 'react-query';
import {
    getDetailExam, getListExercise, getListSubmissions,
    getDetailSubmission, getDetailSubmissionFile, getListUserinClass,
    getCheckSubmission
} from '../../../inqueryFetch/classManager';
import { Exam, Exercises, StudentScore, Student } from '../../../Type/Exercise';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../Context';
import { Card, List, Avatar, Drawer, DrawerProps, message, Button } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { Space, Spin, Modal } from 'antd';
import Chart from '../CardExam/Description/Chart/Chart';




const Submission = () => {
    const { courseId } = useGlobalContext();
    const { id, examId } = useParams();
    const [exerId, setExerId] = useState('');
    const [tasksInExam, setTasksInExam] = useState<Exercises[]>([]);
    const [exam, setExam] = useState<Exam>();
    const [listExerinExam, setListExerInExam] = useState<Array<number>>([]);
    const [listExercise, setListExercise] = useState<Exercises[]>([]);
    const [listSubmis, setListSubmis] = useState<StudentScore[]>([]);
    const [students, setListStudent] = useState<Student[]>([]);
    const [submitId, setSubmitId] = useState('');
    const [submissionFile, setSubmissionFile] = useState('');
    const [studentName, setStudentName] = useState('')
    const navigate = useNavigate()



    const mutationGetListExer = useMutation(getListExercise, {
        onSuccess: (data) => setListExercise(data),
        onError: (error) => console.error('Error fetching class list:', error)
    });

    const mutationGetDetailExam = useMutation(getDetailExam, {
        onSuccess: (data) => {
            setExam(data.exam);
            setListExerInExam(data.exercise_ids);
        },
        onError: (error) => console.error('Error fetching exam details:', error)
    });

    const mutaGetListSubmission = useMutation(getListSubmissions, {
        onSuccess: (data) => setListSubmis(data),
        onError: (error) => console.error('Error fetching submissions:', error)
    });

    const mutationGetUser = useMutation(getListUserinClass, {
        onSuccess: (data) => setListStudent(data),
        onError: (error) => console.error('Error fetching users:', error)
    });

    const mutationGetDetailSubmission = useMutation(getDetailSubmission, {
        onSuccess: (data) => { },
        onError: (error) => console.error('Error fetching submission detail:', error)
    });

    const mutationGetDetailSubmissionFile = useMutation(getDetailSubmissionFile, {
        onSuccess: (data) => setSubmissionFile(data),
        onError: (error) => console.error('Error fetching submission file:', error)
    });

    const mutationGetCheckSubmissionFile = useMutation(getCheckSubmission, {
        onSuccess: (data) => { },
        onError: (error) => console.error('Error fetching submission file:', error)
    });


    useEffect(() => {
        mutationGetDetailExam.mutate(Number(examId));
        mutationGetListExer.mutate(courseId);
        mutationGetUser.mutate(Number(id));
    }, []);

    useEffect(() => {
        if (listExercise && listExerinExam) {
            setTasksInExam(listExercise.filter(exercise => listExerinExam.includes(exercise.id!)));
        }
    }, [listExerinExam, listExercise]);

    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('left');



    const handleCallCheckSubmisson = (exerId?: number) => {

        if (exerId) {
            mutationGetCheckSubmissionFile.mutate({ exam_id: Number(id), exercise_id: exerId })
        }
    }
    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);
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
    useEffect(() => {
        if (submitId) {
            mutationGetDetailSubmission.mutate(submitId)
            mutationGetDetailSubmissionFile.mutate(submitId);
        }
    }, [submitId])
    const setNameAndId = (nameExer?: string, idExer?: number) => {
        // item.name ? setExerId(item.name) : '';
        if (nameExer && idExer) {
            setExerId(nameExer)
        }
        mutaGetListSubmission.mutate({ exam_id: Number(examId), exercise_id: idExer ? idExer : 0, class_id: Number(id) });
    }
    return (
        <span className='submission-contain' style={{ display: 'flex' }}>

            <span>
                <Card title={<>
                    <Button type='link' onClick={() => navigate(-1)}><ArrowLeftOutlined style={{ fontSize: 15 }} /> Back</Button>
                    - {exam?.name}</>} bordered={true} style={{ width: 600, marginLeft: 270, height: 750, marginRight: 20 }}>
                    {tasksInExam.length === 0 && <Spin indicator={<LoadingOutlined style={{ fontSize: 55, marginTop: 250, marginLeft: 250 }} spin />} />}
                    <List
                        itemLayout="horizontal"
                        dataSource={tasksInExam}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />}
                                    title={<a onClick={() => {
                                        setNameAndId(item.name, item.id)
                                        handleCallCheckSubmisson(item.id)
                                    }}>{item.name} <Button type='link' style={{ fontSize: 15 }} onClick={showModal}>Kiểm tra trùng lặp</Button></a>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </span>
            <span>
                <Card title="Danh sách nộp bài" bordered={false} style={{ width: 670, height: 750 }}>
                    <h4 style={{ marginTop: -20 }}> Bài tập : {exerId}</h4>
                    {exerId && (
                        <List
                            itemLayout="horizontal"
                            dataSource={listSubmis}
                            renderItem={item => {
                                const student = students.find(Student => Student.id === item.student_id);
                                const studentName = student ? student.username : "Unknown Student";

                                return (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                                            title={<a onClick={() => {
                                                setSubmitId(item.uuid);
                                                showDrawer();
                                                setStudentName(studentName)
                                            }}>{item.name} - {studentName}</a>}
                                            description={<div>
                                                <div>{item.description}</div>
                                                <h4> Điểm : {item.score ? item.score : 'Chưa chấm'}</h4>
                                            </div>}
                                        />
                                    </List.Item>
                                );
                            }}
                        />
                    )}

                </Card>
            </span>
            <Drawer
                title="Chi tiết bài làm"
                placement={placement}
                closable={false}
                onClose={onClose}
                style={{ marginLeft: 230 }}
                open={open}
                key={placement}
                width={700}
            >
                <h4> Học viên : {studentName}</h4>
                <p> {!submissionFile && 'Loading...'}</p>
                <SyntaxHighlighter language="c" style={dark}>
                    {submissionFile}
                </SyntaxHighlighter>
            </Drawer>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1200} footer={false} >
                <Chart />
            </Modal>

        </span>
    );
};

export default Submission;

