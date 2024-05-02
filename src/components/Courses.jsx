import { Button, message, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { coursesService } from "../services/courses";
import { Link } from "react-router-dom";

function getColumns(deleteHandler) {
    return [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`edit/${record.id}`}>
                        <Button icon={<EditOutlined />}></Button>
                    </Link>
                    <Popconfirm
                        title="Delete the course"
                        description={`Are you sure to delete ${record.name}?`}
                        onConfirm={() => deleteHandler(record.id)}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <Button danger icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                </Space>
            ),
    },
]};

export default function Courses() {
  
    const [ courses, setCourses ] = useState([]);

    const loadCourses = async () => {
        const response = await coursesService.get()
        setCourses(response.data);
    }

    const deleteCourse = async (id) => {
        console.log("Deleting course: ", id);

        const res = await coursesService.delete(id);

        if (res.status === 200) {
            setCourses(courses.filter(x => x.id !== id));
            message.success('Course deleted successfully!');
        }
    };

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <>
        <Space>
            <Button style={{ marginBottom: 10 }} type="primary">
                <Link to="create">Create New Course</Link>
            </Button>
            <Button style={{ marginBottom: 10 }} type="primary">
                <Link to="edit">Edit</Link>
            </Button>
        </Space>
        <Table columns={getColumns(deleteCourse)} dataSource={courses} pagination={{ pageSize: 10 }} rowKey="id" />
    </>
    );
}