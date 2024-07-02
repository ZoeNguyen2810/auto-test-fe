import React, { useEffect, useState } from 'react';
import { Button, Input, message, Drawer, Form, DatePicker } from 'antd';
import './CreateExamDrag.scss';
import { BookOutlined, CloseCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { createExam, getDetailExam, getListExercise, updateExam } from '../../../../inqueryFetch/classManager';
import { useMutation } from 'react-query';
import { Exam, Exercises } from '../../../../Type/Exercise';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ImgExer } from './imgExercise.svg';
import { ReactComponent as Pencir } from './pen.svg';
import { useGlobalContext } from '../../../../Context';
import { useForm, Controller } from 'react-hook-form';
import { SnippetsOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

const CreateExamDrag = () => {
    const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm<Exam>();
    const [listExercise, setListExercise] = useState<Exercises[]>([]);
    const { courseId } = useGlobalContext();
    const [tasksInExam, setTasksInExam] = useState<Exercises[]>([]);
    const [open, setOpen] = useState(false);
    const [exam, setExam] = useState<Exam>()
    const [listExerinExam, setListExerInExam] = useState<Array<number>>([])
    const { id, examId } = useParams();
    const navigate = useNavigate();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

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

    const mutationGetDetailExam = useMutation(getDetailExam, {
        onSuccess: (data) => {
            message.success('Lấy thông tin thành công');
            // setTasksInExam(data.questions);
            setExam(data.exam)
            setListExerInExam(data.exercise_ids)


            setOpen(true); // Mở Drawer khi có examId và đã lấy được dữ liệu
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể lấy thông tin');
        }
    });

    const mutationCreateExam = useMutation(createExam, {
        onSuccess: (data) => {
            message.success('Tạo bài kiểm tra thành công');
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể tạo bài kiểm tra');
        }
    });

    const mutationEditExam = useMutation(updateExam, {
        onSuccess: (data) => {
            message.success('Chỉnh sửa bài kiểm tra thành công');
        },
        onError: (error) => {
            console.error('Error fetching class list:', error);
            message.error('Không thể tạo bài kiểm tra');
        }
    });


    const onSubmit = (data: Exam) => {
        let questions = tasksInExam.map(task => task.id).filter((id): id is number => id !== undefined);
        data.questions = [...questions];
        if (examId) {
            data.exam_id = Number(examId);
            mutationEditExam.mutate(data)
            console.log('Zoe check here');
        } else {
            data.class_id = Number(id);
            mutationCreateExam.mutate(data);
        }
        reset();
        navigate(-1);
    };

    function handleOnDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

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

    useEffect(() => {
        mutationGetListExer.mutate(courseId);
        if (examId) {
            mutationGetDetailExam.mutate(Number(examId));
        }
        
    }, [id, examId]);
    useEffect(() => {
        if (listExercise && listExerinExam) {
            setTasksInExam(listExercise.filter(exercise => listExerinExam.includes(exercise.id!)));
        }
    }, [listExerinExam, listExercise])
   

    return (
        <div className="containerCreateExam">
            <div className="left">
                <h3 style={{ color: '#050581', marginLeft: 15, marginTop: -4 }} onClick={() => navigate(-1)}> <ArrowLeftOutlined /> Quay Lại</h3>
                <div className="header">
                    <div className="taskContainer">
                        <h4 style={{ color: '#3333f0', fontSize: 20, marginLeft: '-50%', marginBottom: 15 }}>
                            <BookOutlined /> Danh Sách bài tập
                        </h4>
                        <div style={{ height: 780, overflowY: 'auto' }}>
                            {listExercise && listExercise.map(task => (
                                <div
                                    key={task.id}
                                    className="task"
                                    draggable
                                    onDragStart={(e) => handleOnDrag(e, task)}
                                >
                                    <span style={{ marginLeft: -100 }}>
                                        <ImgExer style={{ marginTop: 8 }} />
                                        <span style={{ float: 'right', marginRight: 30, marginTop: 17, fontSize: 17 }}>
                                            <div>Tên bài tập</div>
                                            <div>{task.name}</div>
                                        </span>
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
                            <Button type='primary' style={{ float: 'right', width: 100, marginRight: 30 }} onClick={showDrawer}>Tạo</Button>
                        </h2>
                        <div className="tasks" onDragOver={handleOnDragOver} onDrop={handleOnDropTodo}>
                            {tasksInExam.map(task => (
                                <div
                                    key={task.id}
                                    className="taskRight"
                                >
                                    <div>
                                        <h3> <Pencir style={{ marginLeft: 20 }} />{task.name}</h3>
                                    </div>
                                    <span style={{ marginLeft: 60 }}>
                                        <span>Nội Dung : </span>
                                        <span>{task.description}</span>
                                    </span>
                                    <Button type='primary' style={{ float: 'right', margin: 12, marginTop: 70 }} onClick={() => handleDelete(task.id)}><CloseCircleOutlined style={{ fontSize: 20 }} /></Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Drawer title="Tạo bài kiểm tra :" onClose={onClose} open={open} width={700} >
                <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='add-exam' style={{ marginLeft: '7%' }}>
                    <Form.Item
                        label="Tên bài kiểm tra"
                        validateStatus={errors.name ? 'error' : ''}
                        required
                        help={errors.name ? errors.name.message : ''}>
                        <Controller
                            control={control}
                            name='name'
                            defaultValue={exam?.name}
                            rules={{
                                required: "Không được bỏ trống",
                                maxLength: {
                                    value: 255,
                                    message: "Độ dài tối đa 255 kí tự"
                                }
                            }}
                            render={({ field }) => <Input {...field} style={{ width: '95%' }} />}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả bài kiểm tra"
                        validateStatus={errors.description ? 'error' : ''}
                        required
                        help={errors.description ? errors.description.message : ''}>
                        <Controller
                            control={control}
                            name='description'
                            defaultValue={exam?.description}
                            rules={{
                                required: "Không được bỏ trống",
                                maxLength: {
                                    value: 1000,
                                    message: "Độ dài tối đa 1000 kí tự"
                                }
                            }}
                            render={({ field }) => <TextArea rows={7} {...field} style={{ width: '95%' }} />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <h4> <SnippetsOutlined style={{ fontSize: 20 }} /> Danh sách bài tập :</h4>
                        <div>
                            {tasksInExam.map((exercise) => {
                                return (
                                    <div key={exercise.id}>
                                        <h4>{exercise.name}</h4>
                                    </div>
                                );
                            })}
                        </div>
                    </Form.Item>
                    <Form.Item
                        label='Ngày bắt đầu'
                        validateStatus={errors.start_date ? "error" : ''}
                        required
                        help={errors.start_date ? errors.start_date.message : ''}
                    >
                        <Controller
                            control={control}
                            name='start_date'
                            defaultValue={exam?.start_date ? moment(exam.start_date).toDate() : undefined}
                            rules={{
                                required: 'Không được bỏ trống ngày bắt đầu',
                            }}
                            render={({ field }) => <DatePicker
                                style={{ width: "95%" }}
                                value={field.value ? moment(field.value) : null}
                                onChange={(date, dateString) => field.onChange(dateString)}
                            />}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Ngày kết thúc'
                        validateStatus={errors.end_date ? "error" : ''}
                        required
                        help={errors.end_date ? errors.end_date.message : ''}
                    >
                        <Controller
                            control={control}
                            name='end_date'
                            defaultValue={exam?.end_date ? moment(exam.end_date).toDate() : undefined}
                            rules={{
                                required: 'Không được bỏ trống ngày kết thúc',
                            }}
                            render={({ field }) => <DatePicker
                                style={{ width: "95%" }}
                                value={field.value ? moment(field.value) : null}
                                onChange={(date, dateString) => field.onChange(dateString)}
                            />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' type='primary' style={{ marginLeft: '40%', width: 100 }} >Tạo bài tập</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default CreateExamDrag;
