import React, { useEffect } from 'react';
import { Button, Card, message } from 'antd';
import './Course.scss'
import { useMutation } from 'react-query';
import { getListCourse } from '../../inqueryFetch/managerExam';
import { useNavigate } from 'react-router-dom';

const gridStyle: React.CSSProperties = {
    width: '200px',
    height: '200px',
    textAlign: 'center',
    margin : '15px',
};

const Course:React.FC = () => {
    const navigate = useNavigate()

    const mutation = useMutation(getListCourse , {
        onSuccess: (data) => {
            message.success('List of courses successfully loaded')
        },
        onError: (error) => {
            console.log(error);
            message.error('List of courses failed to load')
        }
    })
    useEffect(() => {
        mutation.mutate()
    } , [])
    return (
        <>
        <Card title={
        <div>
            List of Course
            <Button type='primary' onClick={() =>  navigate('/teacher/create-Course')}  style={{ marginLeft : 15}}> Create Course</Button>
        </div>
        } style={{ marginLeft: 250 }}>
            
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>
                Content
            </Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
        </Card>
        </>
        
    )
}

export default Course
