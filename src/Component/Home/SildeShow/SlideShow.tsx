import React from "react";
import { Carousel } from "antd";
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "200px",
    lineHeight: "160px",
};

export const SlideShow: React.FC = () => {
    const onChange = () => {
        console.log(12);
    };

    return (
        <Carousel afterChange={onChange} autoplay={true}>
            <div>
                <img
                    src="https://www.hays.com.au/documents/3173609/3716998/Image_Tech_Job_Software_Developer_LandingPage.jpg/482fcd02-18cd-7adc-69ec-2810709139af?t=1618902865233"
                    alt="Image 1"
                    style={{ ...contentStyle, objectFit: "cover", width: 1270, borderRadius: 10 }}
                />
            </div>
            <div>
                <img
                    src="https://3.bp.blogspot.com/-dB6ndKqIAuI/XdWeOASO5AI/AAAAAAAANZA/MSbT9mh6bukxkI-tqnu_GARIZZV5WNVhQCLcBGAsYHQ/s1600/image1.gif"
                    alt="Image 1"
                    style={{ ...contentStyle, objectFit: "cover", width: 1270, borderRadius: 10 }}
                />
            </div>
            <div>
                <img
                    src="https://tse4.mm.bing.net/th?id=OIP.ocLeVnq-Ji45r8-NrtRXMAHaC5&pid=Api&P=0&h=180"
                    alt="Image 1"
                    style={{ ...contentStyle, objectFit: "cover", width: 1270, borderRadius: 10 }}
                />
            </div>
            <div>
                <img
                    src="https://wallpaperaccess.com/full/5675718.jpg"
                    alt="Image 1"
                    style={{ ...contentStyle, objectFit: "cover", width: 1270, borderRadius: 10 }}
                />
            </div>
        </Carousel>
    );
};
