import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { ListEx } from './ListEx/ListEx';
import './Content.scss'; // Import CSS file directly

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

export const Content = () => {
    const { token } = theme.useToken();

    const wrapperStyle: React.CSSProperties = {
        width: 350,
        height: 400,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    return (
        <span style={{ display: 'flex', marginLeft: 250, marginTop: 25 }} className="container">
            <span className="content">
                <ListEx />
            </span>
            <span>
                <div style={wrapperStyle}>
                    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </div>
            </span>
        </span>
    );
};
