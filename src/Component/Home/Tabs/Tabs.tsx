import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import {
    ArrowRightOutlined,
    ContainerOutlined,
    LaptopOutlined,
    MonitorOutlined,
    TeamOutlined,
} from "@ant-design/icons";
const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps["items"] = [
    {
        key: "1",
        label: (
            <div style={{ marginLeft: 200, marginRight: 40 }}>Learn New Skills</div>
        ),
        children: (
            <span style={{ display: "flex" }}>
                <span>
                    <div style={{ color: "#242582", fontSize: 30, marginLeft: 40 }}>
                        {" "}
                        <ContainerOutlined /> Learn
                    </div>
                    <div
                        style={{
                            color: "#242582",
                            marginLeft: 40,
                            marginTop: 20,
                            width: 400,
                            fontWeight: 400,
                            lineHeight: "148%",
                            letterSpacing: "-0.16px",
                            fontSize: 16,
                        }}
                    >
                        Level up and advance your career with practice-based learning that
                        meets you where you are and adapts to your unique skills journey.
                    </div>
                    <div
                        style={{
                            color: "#1062fb",
                            fontSize: 25,
                            fontWeight: 600,
                            marginLeft: 60,
                            marginTop: 20,
                        }}
                        className="link_text"
                    >
                        GET STARTED {"   "}
                        <ArrowRightOutlined />
                    </div>
                </span>
                <span>
                    <img
                        style={{ width: 650, height: 500, marginLeft: 50 }}
                        src="https://codesignal.com/wp-content/uploads/2023/12/learn-new-skills.png"
                        alt=""
                    />
                </span>
            </span>
        ),
    },
    {
        key: "2",
        label: (
            <div style={{ marginLeft: 200, marginRight: 40 }}>
                Hire Top Talent Faster
            </div>
        ),
        children: (
            <span style={{ display: "flex" }}>
                <span>
                    <span>
                        <div style={{ fontSize: 30, marginLeft: 40 }}>
                            {" "}
                            <TeamOutlined /> Pre-Screen
                        </div>
                        <div
                            style={{
                                marginLeft: 40,
                                marginTop: 20,
                                width: 400,
                                fontWeight: 400,
                                lineHeight: "148%",
                                letterSpacing: "-0.16px",
                                fontSize: 16,
                            }}
                        >
                            Ditch the resume screens and hone in on skilled candidates early
                            with our top-of-funnel evaluations for high-volume pipelines.
                        </div>
                        <div
                            style={{
                                color: "#1062fb",
                                fontSize: 25,
                                fontWeight: 600,
                                marginLeft: 60,
                                marginTop: 20,
                            }}
                            className="link_text"
                        >
                            GET STARTED {"   "}
                            <ArrowRightOutlined />
                        </div>
                    </span>
                    <span>
                        <div style={{ fontSize: 30, marginLeft: 40, marginTop: 40 }}>
                            {" "}
                            <MonitorOutlined /> Interview
                        </div>
                        <div
                            style={{
                                marginLeft: 40,
                                marginTop: 20,
                                width: 400,
                                fontWeight: 400,
                                lineHeight: "148%",
                                letterSpacing: "-0.16px",
                                fontSize: 16,
                            }}
                        >
                            Deliver the best candidate experience in a realistic coding
                            environment, while accurately evaluating skill and fit.
                        </div>
                        <div
                            style={{
                                color: "#1062fb",
                                fontSize: 25,
                                fontWeight: 600,
                                marginLeft: 60,
                                marginTop: 20,
                            }}
                            className="link_text"
                        >
                            GET STARTED {"   "}
                            <ArrowRightOutlined />
                        </div>
                    </span>
                </span>
                <span>
                    <img
                        style={{ width: 650, height: 500, marginLeft: 50 }}
                        src="https://codesignal.com/wp-content/uploads/2023/12/hire-top-talent-faster-1536x1280.png"
                        alt=""
                    />
                </span>
            </span>
        ),
    },
    {
        key: "3",
        label: (
            <div style={{ marginLeft: 200, marginRight: 40 }}>
                Upskill or Reskill Your Team
            </div>
        ),
        children: (
            <span style={{ display: "flex" }}>
                <span>
                    <div style={{ fontSize: 30, marginLeft: 60, marginTop: 40 }}>
                        {" "}
                        <LaptopOutlined /> Develop
                    </div>
                    <div
                        style={{
                            marginLeft: 40,
                            marginTop: 20,
                            width: 400,
                            fontWeight: 400,
                            lineHeight: "148%",
                            letterSpacing: "-0.16px",
                            fontSize: 16,
                        }}
                    >
                        Improve team performance with personalized, practice-based,
                        technical learning that delivers real, measurable results.
                    </div>
                    <div
                        style={{
                            color: "#1062fb",
                            fontSize: 25,
                            fontWeight: 600,
                            marginLeft: 60,
                            marginTop: 20,
                        }}
                        className="link_text"
                    >
                        GET STARTED {"   "}
                        <ArrowRightOutlined />
                    </div>
                </span>
                <span>
                    <img
                        style={{ width: 650, height: 500, marginLeft: 50 }}
                        src="https://codesignal.com/wp-content/uploads/2023/12/upskill-reskill-your-team.png"
                        alt=""
                    />
                </span>
            </span>
        ),
    },
];

export const Tab = () => {
    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};
