import React, { useState, useEffect } from 'react'
import { Button, Input, Avatar, List, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import VirtualList from 'rc-virtual-list'
import { useNavigate } from 'react-router-dom'
import { getListExamStudent } from '../../../../inqueryFetch/classManager'
import { useMutation } from 'react-query'
import { Exam } from '../../../../Type/Exercise'
import { CheckCircleOutlined } from '@ant-design/icons'

interface UserItem {
    email: string
    gender: string
    name: {
        first: string
        last: string
        title: string
    }
    nat: string
    picture: {
        large: string
        medium: string
        thumbnail: string
    }
}

const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo'
const ContainerHeight = 400

export const ListEx = () => {
    const [exam, setListExam] = useState<Exam[]>([])
   
    const mutationGetAllStudent = useMutation(getListExamStudent, {
        onSuccess: (data) => {
            console.log(data)
            setListExam(data)
        },
        onError: (error) => {
            console.error('Error fetching class list:', error)
            message.error('Không thể lấy thông tin')
        }
    })
    const [data, setData] = useState<UserItem[]>([])
    const navigate = useNavigate()

    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results))
                message.success(`${body.results.length} more items loaded!`)
            })
    }

    useEffect(() => {
        appendData()
        mutationGetAllStudent.mutate()
    }, [])

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
            appendData()
        }
    }

    return (
        <div style={{}}>
            <span style={{ display: 'flex', marginBottom: 30 }}>
                <div style={{ marginLeft: 300, marginRight: 20, fontSize: 17, color: "#1677ff" }}><SearchOutlined /> Search topic : </div>
                <Input style={{ width: 300, marginRight: 20 }} />
                <Button type='primary' htmlType='submit'>Search</Button>
            </span>
            <div style={{ marginBottom: 35 }}>
                <List>
                    <VirtualList
                        data={exam}
                        height={ContainerHeight}
                        itemHeight={47}
                        itemKey="email"
                        onScroll={onScroll}
                    >
                        {(item: Exam) => {
                            const submitted = item.exam_cont.some(item => item.submitted == false) 
                            return (
                                (
                                    <List.Item key={item.id} style={{ marginLeft: 50 }}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={`https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png`} />}
                                            title={<a onClick={() => navigate(`/class-submission/${item.class_id}/exam/${item.id}`)}>{item.name}</a>}
                                            description={<span>{item.description}</span>}
                                        />
                                        <div style={{ marginLeft : -20}}>{item.start_date ? new Date(item.start_date).toLocaleDateString() : 'No start date'} -
                                            {item.end_date ? new Date(item.end_date).toLocaleDateString() : ''} </div>
                                            { !submitted && <CheckCircleOutlined  style={{ fontSize : 22 , marginLeft : 10 , color:'#1677ff'}}/>}
                                        <Button type='link' onClick={() => navigate(`/class-submission/${item.class_id}/exam/${item.id}`)}>Detail</Button>
                                    </List.Item>
                                )
                            )
                        }}
                    </VirtualList>
                </List>
            </div>
        </div>
    )
}
