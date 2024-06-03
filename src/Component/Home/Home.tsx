import React from "react";
import "./Home.scss";
import {
    GithubOutlined,
    GitlabOutlined,
    Html5Outlined,
} from "@ant-design/icons";
import { ToolTip } from "./ToolTipHead/ToolTip";
import { Video } from "./Video/Video";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SlideShow } from "./SildeShow/SlideShow";
import { Tab } from "./Tabs/Tabs";

export const Home = () => {
    const navigate = useNavigate();
    const a = [1, 2, 3, 4];
    a[3] = 2;
    a.push(5);
    return (
        <div className="home-container">
            <span className="icon-head">
                <GitlabOutlined className="icon" style={{ fontSize: 40 }} />
                <Html5Outlined
                    className="icon"
                    style={{ fontSize: 40, color: "#ffa116" }}
                />
                <GithubOutlined className="icon" style={{ fontSize: 40 }} />
                <span style={{ marginLeft: 10, fontSize: "40px" }}>Let's Code !</span>
                <span style={{ float: "right", marginRight: 10, marginTop: -10 }}>
                    <ToolTip />
                </span>
            </span>
            <div>
                <span style={{ display: "flex" }}>
                    <span>
                        <div
                            style={{
                                marginTop: 70,
                                width: 500,
                                fontFamily: "inherit",
                                fontSize: 40,
                                lineHeight: "inherit",
                                fontStyle: "inherit",
                                color: "#242582",
                                textTransform: "uppercase",
                                fontWeight: 600,
                            }}
                        >
                            Discover and develop the skills that will shape the future !
                        </div>
                        {/* font-style: normal;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 148%;
                        letter-spacing: -.01em; */}
                        <p
                            style={{
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: 20,
                                lineHeight: "148%",
                                letterSpacing: "-.01em",
                                color: "#1677ff",
                                width: 600,
                            }}
                        >
                            Whether you want to level up your skills or build a great team,
                            CodeSignal’s skills assessments and AI-powered learning tools get
                            you where you need to go.
                        </p>
                        <span>
                            <Button
                                style={{ marginRight: 10, marginLeft: 100, color: "#1677ff" }}
                                onClick={() => navigate("/support/anotherOption")}
                            >
                                START HIRING
                            </Button>
                            <Button type="primary" onClick={() => navigate("/lesson-learn")}>
                                START LEARNING
                            </Button>
                        </span>
                    </span>

                    <span>
                        <Video />
                    </span>
                </span>
            </div>
            <div style={{ marginTop: 150, marginLeft: -10, marginBottom: 70 }}>
                <SlideShow />
            </div>
            {/* font-family: inherit;
            font-size: 100%;
            line-height: inherit;
            font-weight: inherit;
            font-style: inherit; */}
            <div>
                <div
                    style={{
                        fontFamily: "inherit",
                        fontSize: 50,
                        lineHeight: "inherit",
                        fontWeight: "inherit",
                        fontStyle: "inherit",
                        marginLeft: "20%",
                        color: "#242582",
                    }}
                >
                    Where great teams come to level up
                </div>
                <p style={{ marginLeft: "27%", color: "#242582" }}>
                    Discover and develop the skills that will shape the future with the
                    CodeSignal skills platform
                </p>
            </div>
            <div>
                <Tab />
            </div>
            <div
                style={{
                    width: 1200,
                    height: 608,
                    backgroundColor: "#1D263E",
                    borderRadius: 10,
                    marginTop: 60,
                    marginLeft: 40,
                }}
            >
                <span style={{ display: "flex", marginLeft: 50 }}>
                    <span style={{ width: 450 }}>
                        <div style={{
                            fontFamily: 'inherit',
                            fontWeight: 'inherit',
                            lineHeight: 'inherit',
                            outline: 0,
                            fontStyle: 'inherit',
                            color: '#fff',
                            fontSize: 40,
                            margin: '50px 0 10px 60px'
                        }}>Meet Cosmo: The smartest AI guide in the universe</div>
                        <div style={{ color: '#fff', fontFamily: 'inherit', fontSize: 18, marginLeft: 40 }}>
                            Our built-in AI guide and tutor, Cosmo, prompts you with
                            challenges that are built just for you and unblocks you when you
                            get stuck.
                        </div>

                        <Button style={{ backgroundColor: '#1D263E', color: "#fff", width: 300, height: 70, marginLeft: 80, marginTop: 40, borderWidth: 2 }}>
                            <div style={{ fontSize: 30 }}>Grow with Cosmo</div>
                        </Button>
                    </span>
                    <span>
                        <img src="https://codesignal.com/wp-content/uploads/2023/12/cosmo-1.svg" alt="" style={{ borderRadius: 4, margin: '50px 20px 0 100px' }} />
                    </span>
                </span>
            </div>
        </div>
    );
};
