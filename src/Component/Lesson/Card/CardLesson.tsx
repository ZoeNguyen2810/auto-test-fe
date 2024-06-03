import React from "react";
import { Button, Card , Tooltip } from "antd";
import { on } from "events";


const { Meta } = Card;

type Props = {
  src : string;
  title: string;
  description: string;
  link : string

}

const CardLesson = ({ src , title , description , link} : Props) => {
  const handleClick = () =>{
    window.open(link)
  }
  return (
    <Card
      hoverable
      style={{
        width: 340,
        height : 380
      }}
      cover={<img alt="example" src={src} />}
      actions={[<Button type="primary" onClick={handleClick} style={{ width: 150 , color : 'white'}}>Start Learning</Button>]}
    >
      <Meta title={<Tooltip title={title}>{title}</Tooltip> } description={description} />
    </Card>
  )
};

export default CardLesson;
