import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { getStudents } from "../services/students";
import { Link } from "react-router-dom";


const columns = [
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
        render: (text) => <span>{text.toString()}</span>
    },
    {
        title: 'Group name',
        dataIndex: 'groupName',
        key: 'groupName',
    },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <Space size="middle">
    //             <a>Show</a>
    //             <Popconfirm
    //                 title="Delete the product"
    //                 description={`Are you sure to delete ${record.title}?`}
    //                 onConfirm={() => confirm(record.id)}
    //                 okText="Yes"
    //                 cancelText="No"
    //                 placement="left"
    //             >
    //                 <Button danger icon={<DeleteOutlined />}></Button>
    //             </Popconfirm>
    //         </Space>
    //     ),
    // },
];

export default function Students() {
  
    const [ students, setStudents ] = useState([]);

    const loadStudents = async () => {
        const response = await getStudents();
        setStudents(response.data);
    }

    useEffect(() => {
        loadStudents();
    }, []);

    return (
        <>
            <Space>
                <Button style={{ marginBottom: 10 }} type="primary">
                    <Link to="create">Create New Student</Link>
                </Button>
            </Space>
            <Table columns={columns} dataSource={students} pagination={{ pageSize: 10 }} rowKey="id" />
        </>
    );
}
 
