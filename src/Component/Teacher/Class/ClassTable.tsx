import React, { useState } from "react";
import { Table, Button } from "antd";
import "./ClassTable.scss"; // Tạo một file CSS riêng để tùy chỉnh giao diện table nếu cần
import { Drawer, Radio, Space, Form, Input, DatePicker } from 'antd';
import { Controller, useForm } from 'react-hook-form'
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Class } from "../../../Type/Exercise";

const { TextArea } = Input;


const ClassTable: React.FC = () => {
  // Dữ liệu mẫu về các lớp học
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm<Class>()
  const data = [
    {
      key: "1",
      className: "Lớp A",
      teacher: "Nguyễn Văn A",
      students: 30,
      status: "Đang mở",
    },
    {
      key: "2",
      className: "Lớp B",
      teacher: "Trần Thị B",
      students: 25,
      status: "Đã đóng",
    },
    // Thêm dữ liệu khác nếu cần
  ];

  // Cấu trúc cột cho table
  const columns = [
    {
      title: "Tên lớp học",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Giáo viên",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Số lượng học viên",
      dataIndex: "students",
      key: "students",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text: string, record: any) => (
        <Button type="link" onClick={() => handleAction(record.key)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  // Xử lý hành động khi click vào nút "Chi tiết"
  const handleAction = (key: string) => {
    // Thực hiện các hành động cần thiết, ví dụ: mở modal, điều hướng tới trang chi tiết lớp học, vv.
    console.log("Chi tiết lớp học có key:", key);
  };
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  const onSubmit = (data: Class) => {
    console.log(data)
    onClose()
  }
  const showDrawer = () => {
    setOpen(true);
  };


  const onClose = () => {
    setOpen(false);
  };


  return (
    <>
      <div className="class-table-container">
        <h1 style={{ marginLeft: 250 }}> Danh sách lớp học : </h1>
        <Button type="primary" style={{ marginTop: 2, marginBottom: 10, marginLeft: 250 }} onClick={showDrawer}>
          Thêm lớp học
        </Button>
        <Table dataSource={data} columns={columns} />
      </div>
      <Drawer
        title="Tạo lớp học"
        placement='right'
        width={800}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="primary" onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='SignUp' style={{ marginTop : -100}} >
          <Form.Item
            label='Tên lớp học'
            validateStatus={errors.class_name ? "error" : ''}
            required
            help={errors.class_name ? errors.class_name.message : ''}
            style={{ marginLeft : -200}}
            >
            <Controller
              control={control}
              name='class_name'
              defaultValue=''
              rules={{
                required: 'Không được bỏ trống mật khẩu',
                maxLength: {
                  value: 50,
                  message: ''
                }
              }}
              render={({ field }) => < Input  {...field} />} />
          </Form.Item>
          <Form.Item
            label='Mô tả lớp học và các bài giảng'
            validateStatus={errors.course_id ? "error" : ''}
            required
            help={errors.course_id ? errors.course_id.message : ''}
            style={{ marginLeft : -200}}>
            <Controller
              control={control}
              name='course_id'
              defaultValue=''
              rules={{
                required: 'Không được bỏ trống',
                maxLength: {
                  value: 500,
                  message: ''
                }
              }}
              render={({ field }) => <TextArea rows={11} placeholder='' {...field} />
              } />
          </Form.Item>
          <Form.Item
            label='Ngày bắt đầu'
            validateStatus={errors.start_date ? "error" : ''}
            required
            help={errors.start_date ? errors.start_date.message : ''}
            style={{ marginLeft : -200}}>
            <Controller
              control={control}
              name='start_date'
              // defaultValue=''
              rules={{
                required: 'Không được bỏ trống',
                maxLength: {
                  value: 500,
                  message: ''
                }
              }}
              render={({ field }) => <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                {...field}
              />
              } />
          </Form.Item>
          <Form.Item
            label='Ngày kết thúc'
            validateStatus={errors.end_date ? "error" : ''}
            required
            help={errors.end_date ? errors.end_date.message : ''}
            style={{ marginLeft : -200}}>
            <Controller
              control={control}
              name='end_date'
              // defaultValue=''
              rules={{
                required: 'Không được bỏ trống',
                maxLength: {
                  value: 500,
                  message: ''
                }
              }}
              render={({ field }) => <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                {...field}
              />
              } />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft : 50 , width : 100}}>
              Submit
            </Button>

        </Form>

      </Drawer>
    </>


  );
};

export default ClassTable;
