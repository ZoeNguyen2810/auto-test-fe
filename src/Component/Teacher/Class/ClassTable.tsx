import React, { useEffect, useState } from "react";
import { Table, Button, message, Drawer, Space, Form, Input, DatePicker, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Class } from "../../../Type/Exercise";
import { useMutation } from "react-query";
import { getListClass, createClass, getDetailClass, deleteClass } from "../../../inqueryFetch/classManager";
import './ClassTable.scss';
import moment from 'moment';
import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../Context";
const { TextArea } = Input;

const ClassTable: React.FC = () => {
  const [listClass, setListClass] = useState<Class[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idClass, setIdClass] = useState(0)
  const [count, setCount] = useState(1)
  const navigate = useNavigate()
  const { isRole } = useGlobalContext()

  const [edit, isEdit] = useState(false)
  const mutationCourses = useMutation(getListClass, {
    onSuccess: (data) => {
      message.success('Lấy thông tin thành công');
      setListClass(data);
    },
    onError: (error) => {
      console.error('Error fetching class list:', error);
      message.error('Không thể lấy thông tin');
    }
  });
  const mutaCreateClass = useMutation(createClass, {
    onSuccess: (data) => {
      message.success('Lấy thông tin thành công');
      mutationCourses.mutate()
    },
    onError: (error) => {
      console.error('Error fetching class list:', error);
      message.error('Không thể lấy thông tin');
    }
  });
  const mutaGetDetailClass = useMutation(getDetailClass, {
    onSuccess: (data) => {
      message.success('Lấy thông tin thành công');
    },
    onError: (error) => {
      console.error('Error fetching class list:', error);
      message.error('Không thể lấy thông tin');
    }
  });
  const mutaDeleteClass = useMutation(deleteClass, {
    onSuccess: (data) => {
      message.success('Lấy thông tin thành công');
      mutationCourses.mutate()
    },
    onError: (error) => {
      console.error('Error fetching class list:', error);
      message.error('Không thể lấy thông tin');
    }
  });
  const handleEdit = (record: any) => {
    isEdit(true)
    console.log('Zoe id', record.id);
    mutaGetDetailClass.mutate(record.id)

    showDrawer()
  }

  const showModal = (id: number) => {
    setIdClass(id)
    setIsModalOpen(true);

  };

  const handleOk = () => {
    // onDelete()
    // setIsModalOpen(false);
    mutaDeleteClass.mutate(idClass)
    setIsModalOpen(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<Class>();

  const columns = [
    {
      title: "Tên lớp học",
      key: "name",
      render: (record: any) => {
        return <a style={{ fontSize: 17 }} onClick={() => navigate(`/class-detail/${record.id}`)}>{record.name}</a>
      }
    },
    {
      title: "Giáo viên",
      dataIndex: "teacher_id",
      key: "teacher_id",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      key: "start_date",
      render: (text: string) => moment(text).format('DD/MM/YYYY')
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "end_date",
      render: (text: string) => moment(text).format('DD/MM/YYYY')
    },
    {
      title: "Khoá học",
      dataIndex: "course_id",
      key: "course_id",
    },
    ...(isRole === 1
      ? [
          {
            title: "Hành động",
            key: "action",
            render: (record: any) => (
              <span>
                <Button type="primary" onClick={() => handleEdit(record)}>
                  Chỉnh sửa
                </Button>
                <Button style={{ marginLeft: 15 }} onClick={() => showModal(record.id)}>
                  Delete
                </Button>
              </span>
            ),
          },
        ]
      : []),
  ];

  const handleAction = (key: string) => {
  };

  const [open, setOpen] = useState(false);

  const onSubmit = (data: Class) => {
    console.log(data);
    mutaCreateClass.mutate(data)
    reset()
    onClose();
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    mutationCourses.mutate()
  };

  useEffect(() => {
    mutationCourses.mutate();
  }, []);

  return (
    <>
      <div className="class-table-container">
        <h1 style={{ marginLeft: 250 }}>Danh sách lớp học:</h1>
        {(isRole == 1 || isRole == 2)&& <Button type="primary" style={{ marginTop: 2, marginBottom: 10, marginLeft: 250 }} onClick={showDrawer}>
          Thêm lớp học
        </Button>}

        <Table className="table" dataSource={listClass} columns={columns} pagination={{ pageSize: 10 }} />
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
        <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='SignUp' style={{ marginTop: -100 }}>
          <Form.Item
            label='Tên lớp học'
            validateStatus={errors.class_name ? "error" : ''}
            required
            help={errors.class_name ? errors.class_name.message : ''}
            style={{ marginLeft: 50 , marginTop: 100 , width: 550 }}
          >
            <Controller
              control={control}
              name='class_name'
              defaultValue=''
              rules={{
                required: 'Không được bỏ trống tên lớp học',
                maxLength: {
                  value: 50,
                  message: 'Tên lớp học không được vượt quá 50 ký tự'
                }
              }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label='Khoa hoc'
            validateStatus={errors.course_id ? "error" : ''}
            required
            help={errors.course_id ? errors.course_id.message : ''}
            style={{ marginLeft: 50 ,width: 550 }}
          >
            <Controller
              control={control}
              name='course_id'
              rules={{
                required: 'Không được bỏ trống mô tả lớp học',
                maxLength: {
                  value: 500,
                  message: 'Mô tả lớp học không được vượt quá 500 ký tự'
                }
              }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label='Ngày bắt đầu'
            validateStatus={errors.start_date ? "error" : ''}
            required
            help={errors.start_date ? errors.start_date.message : ''}
            style={{ marginLeft: 50 ,width: 550 }}
          >
            <Controller
              control={control}
              name='start_date'
              rules={{
                required: 'Không được bỏ trống ngày bắt đầu',
              }}
              render={({ field }) => <DatePicker
                style={{ width: "100%" }}
                // format="DD/MM/YYYY"
                // value={field.value ? moment(field.value, 'YYYY-MM-DD') : null}
                onChange={(date, dateString) => field.onChange(dateString)}
              />}
            />
          </Form.Item>
          <Form.Item
            label='Ngày kết thúc'
            validateStatus={errors.end_date ? "error" : ''}
            required
            help={errors.end_date ? errors.end_date.message : ''}
            style={{ marginLeft: 50 ,width: 550 }}
          >
            <Controller
              control={control}
              name='end_date'
              rules={{
                required: 'Không được bỏ trống ngày kết thúc',
              }}
              render={({ field }) => <DatePicker
                style={{ width: "100%" }}
                // format="DD/MM/YYYY"
                // value={field.value ? moment(field.value, 'YYYY-MM-DD') : null}
                onChange={(date, dateString) => field.onChange(dateString)}
              />}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft: '50%', marginTop : 60 ,  width: 100 }}>
            Submit
          </Button>
        </Form>
      </Drawer>
      <Modal title="Xác nhận việc xoá khoá học ?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có chắc chắn muốn xoá khoá học này ?</p>
      </Modal>
    </>
  );
};

export default ClassTable;
