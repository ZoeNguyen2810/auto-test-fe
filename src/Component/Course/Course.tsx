import React, { useEffect, useState } from 'react';
import { Button, Card, message } from 'antd';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getListCourse } from '../../inqueryFetch/managerExam';
import { Course as course } from '../../Type/Exercise';
import { ReactComponent as Logo } from './img-course1.svg';
import { ReactComponent as Logo1 } from './courseImg2.svg';
import { ReactComponent as Logo2 } from './courseImg03.svg';
import { ReactComponent as Logo3 } from './courseImg04.svg';
import { ReactComponent as Logo4 } from './course05.svg';
import { ReactComponent as Logo5 } from './course06.svg';
import './Course.scss';
import { useGlobalContext } from '../../Context';

const gridStyle: React.CSSProperties = {
    width: '240px',
    height: '240px',
    textAlign: 'center',
    margin: '25px',
    backgroundImage: 'none',
    backgroundColor: 'white'
};

const logos = [<Logo />, <Logo1 />, <Logo2 />, <Logo3 />, <Logo4 />, <Logo5 />];

const Course: React.FC = () => {
    const { isRole } = useGlobalContext()
    const navigate = useNavigate();
    const [course, setSource] = useState<course[]>([]);

    const mutation = useMutation(getListCourse, {
        onSuccess: (data) => {
            message.success('List of courses successfully loaded');
            setSource(data);
        },
        onError: (error) => {
            console.log(error);
            message.error('List of courses failed to load');
        }
    });

    useEffect(() => {
        mutation.mutate();
    }, []);

    console.log('Zoe role', isRole);

    return (
        < div className='course'>
            <Card className='card' title={
                <div>
                    List of Course
                    {
                        isRole == 1 && <Button type='primary' onClick={() => navigate('/teacher/create-Course')} style={{ marginLeft: 15 }}>Create Course</Button>
                    }
                </div>
            } style={{ marginLeft: 230 }}>
                {
                    course && course.map((item, index) => {
                        return (
                            <Card.Grid className='card-item' key={index} style={gridStyle} onClick={() => navigate(`/course-detail/${item.id}`)}>
                                <div style={{ marginBottom: 10 }}>{logos[index % logos.length]}</div>
                                <div style={{ fontFamily: 'inherit', fontSize: 20 }}>{item.course_name}</div>
                            </Card.Grid>
                        );
                    })
                }
            </Card>
        </div>
    );
};

export default Course;
