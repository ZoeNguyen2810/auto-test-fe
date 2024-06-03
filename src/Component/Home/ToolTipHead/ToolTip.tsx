import React from "react";
import "./ToolTip.scss";
import { Popover, Button } from "antd"; // Import Button from antd
import {
    BookOutlined,
    BugOutlined,
    BulbOutlined,
    CodeOutlined,
    ConsoleSqlOutlined,
    DatabaseOutlined,
    FileSearchOutlined,
    SnippetsOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const ToolTip: React.FC = () => {
    const navigate = useNavigate()
    const content = (
        <div style={{ width: 400 }}>
            <div>
                <div style={{ fontSize: 17, color: "#1677ff" }}>
                    <FileSearchOutlined /> For Talent Acquisition
                </div>
                <p>From high-volume to hard-to- fill, you've got this</p>
            </div>
            <div>
                <div style={{ fontSize: 17, color: "#1677ff" }} >
                    <TeamOutlined /> 99 For Engineering Leaders
                </div>
                <p>Because technical interviewing isn't your full-time job</p>
            </div>
            <div>
                <div style={{ fontSize: 17, color: "#1677ff" }}>
                    <BugOutlined />
                    For I0 Psychologists
                </div>
                <p>Validated & research-backed technical skills assessments</p>
            </div>
        </div>
    );
    // borderRight: "2px solid #ffa116"  borderRight: "2px solid #ffa116"
    const contentResources = (
        <span style={{ display: "flex" }}>
            <span
                style={{
                    width: 360,
                    marginRight: 20,
                    borderRight: "2px solid #ffa116",
                }}
            >
                <div>
                    <div style={{ fontSize: 17, color: "#1677ff" }}>
                        <BookOutlined /> Resource Library
                    </div>
                    <p>
                        research papers, Access our library of webinars & more Blog Read the
                        latest
                    </p>
                </div>
                <div>
                    <div style={{ fontSize: 17, color: "#1677ff" }}>
                        <SnippetsOutlined /> Blog Read the latest
                    </div>
                    <p>Because technical interviewing isn't your full-time job</p>
                </div>
                <div>
                    <div style={{ fontSize: 17, color: "#1677ff" }}>
                        <BugOutlined />
                        For I0 Psychologists
                    </div>
                    <p>Validated & research-backed technical skills assessments</p>
                </div>
            </span>
            <span>
                <div style={{ width: 300 }}>
                    <div style={{ fontSize: 17, color: "#1677ff" }}>
                        <BulbOutlined />: Knowledge Base
                    </div>
                    <p>Get support and get started using </p>
                </div>
                <div style={{ width: 300 }}>
                    <div style={{ fontSize: 17, color: "#1677ff" }}>
                        <CodeOutlined /> CodeSignal Integrations
                    </div>
                    <p>
                        An integrated part of
                        your HR tech stack</p>
                </div>
            </span>
        </span>
    );
    const contentProblems = (
        <div style={{ width: 350 }}>
            <div>
                <div style={{ fontSize: 17, color: "#1677ff" }}>
                    <Link to='/exam'>
                        <ConsoleSqlOutlined /> Have Exam
                    </Link>
                </div>
                <p>From high-volume to SQL, you've got this</p>
            </div>
            <div>
                <div style={{ fontSize: 17, color: "#1677ff" }}>
                    <Link to='/lesson-learn'>
                        <DatabaseOutlined /> Learn more about Database
                    </Link>
                </div>
                <p>Because technical interviewing isn't your full-time job</p>
            </div>
        </div>
    );


    return (
        <>
            <span className="container">
                <Popover content={content} title="| BY ROLE ">
                    <span className="text">Solution</span>
                </Popover>
                <Popover content={contentResources} title="">
                    <span className="text">Resources</span>
                </Popover>
                <Popover content={contentProblems} title='Stydy Plan'>
                    <span className="text">Problems</span>
                </Popover>
                <Button
                    type="primary"
                    style={{ backgroundColor: "#ffa116", fontSize: 15 }}
                    onClick={() => navigate('/lesson-learn')}
                >
                    Let's Start
                </Button>{" "}
                {/* Use Button component */}
            </span>
        </>
    );
};
