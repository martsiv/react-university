import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { getCourses } from "../services/courses";
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
    }
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

export default function Courses() {
  
    const [ courses, setCourses ] = useState([]);

    const loadCourses = async () => {
        const response = await getCourses()
        setCourses(response.data);
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <>
        <Space>
            <Button style={{ marginBottom: 10 }} type="primary">
                <Link to="create">Create New Course</Link>
            </Button>
        </Space>
        <Table columns={columns} dataSource={courses} pagination={{ pageSize: 10 }} rowKey="id" />
    </>
    );
}
 
