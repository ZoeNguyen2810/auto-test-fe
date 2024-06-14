import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import './CreateExamDrag.scss';
import { BookOutlined, CloseCircleOutlined , ArrowLeftOutlined } from '@ant-design/icons';
import { getListExercise } from '../../../../inqueryFetch/classManager';
import { useMutation } from 'react-query';
import { Exercises } from '../../../../Type/Exercise';
import { useParams } from 'react-router-dom';
import { ReactComponent as ImgExer } from './imgExercise.svg'
import { ReactComponent as Pencir } from './pen.svg'
import { useNavigate } from 'react-router-dom';

const mockExercises: Exercises[] = [
    {
        name: 'Exercise 1',
        description: 'Description for Exercise 1',
        course_id: 101,
        exercise_name: 'Math Basics',
        id: 1
    },
    {
        name: 'Exercise 2',
        description: 'Description for Exercise 2',
        course_id: 102,
        exercise_name: 'Science Fundamentals',
        id: 2
    },
    {
        name: 'Exercise 3',
        description: 'Description for Exercise 3',
        course_id: 103,
        exercise_name: 'History Overview',
        id: 3
    },
    {
        name: 'Exercise 4',
        description: 'Description for Exercise 4',
        course_id: 104,
        exercise_name: 'Geography Basics',
        id: 4
    },
    {
        name: 'Exercise 5',
        description: 'Description for Exercise 5',
        course_id: 105,
        exercise_name: 'Introduction to Literature',
        id: 5
    },
    {
        name: 'Exercise 6',
        description: 'Description for Exercise 6',
        course_id: 106,
        exercise_name: 'Physics Principles',
        id: 6
    },
    {
        name: 'Exercise 7',
        description: 'Description for Exercise 7',
        course_id: 107,
        exercise_name: 'Chemistry Basics',
        id: 7
    },
    {
        name: 'Exercise 8',
        description: 'Description for Exercise 8',
        course_id: 108,
        exercise_name: 'Art History',
        id: 8
    },
    {
        name: 'Exercise 9',
        description: 'Description for Exercise 9',
        course_id: 109,
        exercise_name: 'Music Theory',
        id: 9
    },
    {
        name: 'Exercise 10',
        description: 'Description for Exercise 10',
        course_id: 110,
        exercise_name: 'Introduction to Programming',
        id: 10
    }
];

const CreateExamDrag = () => {
    const [listExercise, setListExercise] = useState<Exercises[]>([]);
    const [tasksInExam, setTasksInExam] = useState<Exercises[]>([]);
    const mutationGetListExer = useMutation(getListExercise, {
        onSuccess: (data) => {
            message.success('Lấy thông tin thành công');
            setListExercise(data);
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể lấy thông tin');
        }
    });

    function handleOnDragOver(e: React.DragEvent) {
        e.preventDefault();
    }
    const navigate = useNavigate()

    function handleOnDrag(e: React.DragEvent, task: Exercises) {
        e.dataTransfer.setData("task", JSON.stringify(task));
    }

    function handleOnDropTodo(e: React.DragEvent) {
        const task = JSON.parse(e.dataTransfer.getData("task"));

        if (!tasksInExam.some(existingTask => existingTask.id === task.id)) {
            setTasksInExam((prevTasksInExam) => [...prevTasksInExam, task]);
        }
    }

    const handleDelete = (id?: number) => {
        setTasksInExam((prevTasksInExam) => prevTasksInExam.filter((task) => task.id !== id));
    };

    const { id } = useParams();
    useEffect(() => {
        mutationGetListExer.mutate(Number(id));
    }, [id]);

    return (
        <div className="container">
            <div className="left">
            <h3 style={{ color : '#050581' , marginLeft : 15 , marginTop : -4}} onClick={() => navigate(-1)}> <ArrowLeftOutlined /> Quay Lại</h3>
                <div className="header">
                    <div className="taskContainer">
                        <h4 style={{ color: '#3333f0', fontSize: 20, marginLeft: '-50%', marginBottom: 15 }}>
                            <BookOutlined /> Danh Sách bài tập
                        </h4>
                        <div style={{ height: 780, overflowY: 'auto' }}>
                            {mockExercises && mockExercises.map(task => (
                                <div
                                    key={task.id}
                                    className="task"
                                    draggable
                                    onDragStart={(e) => handleOnDrag(e, task)}
                                >
                                    <span style={{ marginLeft: -100 }}>
                                        <ImgExer style={{ marginTop: 5 }} />
                                        <span style={{ float: 'right', marginRight: 30, marginTop: 17, fontSize: 17 }}>Tên bài tập -
                                            -{task.name}</span>
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
            <div className="right">
                <div className="main">
                    <div className="column">
                        <h2 style={{ color: '#3333f0', marginLeft: 30 }}>Tạo bài kiểm tra :
                            <Button type='primary' style={{ float: 'right', width: 100, marginRight: 30 }}>Tạo</Button>
                        </h2>
                        <div className="tasks" onDragOver={handleOnDragOver} onDrop={handleOnDropTodo}>
                            {tasksInExam.map(task => (
                                <div
                                    key={task.id}
                                    className="taskRight"
                                >
                                    <div>
                                        <h3> <Pencir style={{ marginLeft : 20}} />{task.name}</h3>
                                    </div>
                                    <span style={{ marginLeft: 60 }}>
                                        <span>Nội Dung : </span>
                                        <span>{task.description}</span>
                                    </span>
                                    <Button type='primary' style={{ float: 'right', margin: 12 , marginTop : 70 }} onClick={() => handleDelete(task.id)}><CloseCircleOutlined style={{ fontSize: 20 }} /></Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateExamDrag;
