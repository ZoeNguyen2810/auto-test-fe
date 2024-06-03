import React from 'react'
import { Card } from 'antd'
import './Description.scss'
import { CodeOutlined, ReloadOutlined, FileTextOutlined, ExperimentOutlined, TagOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd'
import Collapses from './Collapse/Collapse'
import { useState } from 'react'

const { TextArea } = Input;

export const Description = () => {
    const [text, setText] = useState("")
    const handleOnclick = () => {
        console.log(text);
    }
    const handelClear = () => {
        setText("")
    }
    return (
        <>
            <span style={{ display: 'flex' }} className='container'>
                <span>
                    <Card title="Exam" bordered={false} className='card' style={{ marginRight: 20 }}>
                        <span style={{ display: 'flex', marginBottom: 450 }}>
                            <span style={{ fontSize: 17 }} ><FileTextOutlined style={{ color: 'green' }} /> Description </span>
                            <span style={{ fontSize: 17, marginLeft: 10 }}><ExperimentOutlined style={{ color: 'green' }} /> Solution</span>
                            <span style={{ fontSize: 17, marginLeft: 10 }}><TagOutlined style={{ color: 'green' }} /> Solution</span>
                        </span>
                        <Collapses />
                    </Card>
                </span>
                <span>
                    <Card title={<div style={{ fontSize: 20 }}><CodeOutlined style={{ color: "green" }} />  Code</div>} bordered={false} className='card' >
                        <span style={{ display: 'flex', marginBottom: 15, fontSize: 17 }}>
                            <span>*Auto</span>
                            <span style={{ marginLeft: 500 }} onClick={() => handelClear()}><ReloadOutlined /></span>
                        </span>
                        <TextArea rows={21} value={text} placeholder='' maxLength={1000} onChange={(e) => setText(e.target.value)} />
                        <Button type='primary' style={{ margin: "10px 0 0 500px" }} onClick={() => handleOnclick()}>Submit</Button>
                    </Card>
                </span >
            </span >
        </>
    )
}
