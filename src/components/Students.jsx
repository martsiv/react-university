import { Button, message, Popconfirm, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { studentsService } from "../services/students";
import { Link } from "react-router-dom";
import { toLocalDate } from '../utils/utils';

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
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname'
    },
    {
        title: 'Birth date',
        dataIndex: 'birthDate',
        key: 'birthDate',
        render: (date) => <span>{toLocalDate(date)}</span>
    },
    {
        title: 'Group name',
        dataIndex: 'groupName',
        key: 'groupName',
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
                    title="Delete the student"
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

export default function Students() {
  
    const [ students, setStudents ] = useState([]);

    const loadStudents = async () => {
        const response = await studentsService.get();
        setStudents(response.data);
    }

    const deleteStudent = async (id) => {
        console.log("Deleting student: ", id);

        const res = await studentsService.delete(id);

        if (res.status === 200) {
            setStudents(students.filter(x => x.id !== id));
            message.success('Student deleted successfully!');
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <>
            <Space>
                <Button style={{ marginBottom: 10 }} type="primary">
                    <Link to="create">Create New Student</Link>
                </Button>
                <Button style={{ marginBottom: 10 }} type="primary">
                <Link to="edit">Edit</Link>
            </Button>
            </Space>
            <Table columns={getColumns(deleteStudent)} dataSource={students} pagination={{ pageSize: 10 }} rowKey="id" />
        </>
    );
}
 
