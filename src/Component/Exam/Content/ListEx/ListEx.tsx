import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useNavigate } from 'react-router-dom';

interface UserItem {
    email: string;
    gender: string;
    name: {
        first: string;
        last: string;
        title: string;
    };
    nat: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

export const ListEx = () => {
    const [data, setData] = useState<UserItem[]>([]);
    const navigate = useNavigate()

    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));
                message.success(`${body.results.length} more items loaded!`);
            });
    };

    useEffect(() => {
        appendData();
    }, []);

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
            appendData();
        }
    };

    return (
        <>
            <span style={{ display: 'flex', marginBottom: 30 }}>
                <div style={{ marginLeft: 300, marginRight: 20, fontSize: 17, color: "#1677ff" }}><SearchOutlined /> Search topic : </div>
                <Input style={{ width: 300, marginRight: 20 }} />
                <Button type='primary' htmlType='submit' >Search</Button>
            </span>
            <div style={{ marginBottom: 35 }}>
                <List>
                    <VirtualList
                        data={data}
                        height={ContainerHeight}
                        itemHeight={47}
                        itemKey="email"
                        onScroll={onScroll}
                    >
                        {(item: UserItem) => (
                            <List.Item key={item.email}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} />}
                                    title={<a onClick={() => navigate('/exam/Description')}>{item.name.last}</a>}
                                    description={item.email}
                                />
                                <div>Content</div>
                            </List.Item>
                        )}
                    </VirtualList>
                </List>
            </div>
        </>
    )
}
