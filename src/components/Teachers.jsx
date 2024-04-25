import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { getTeachers } from "../services/teachers";
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
        title: 'Work experience full years',
        dataIndex: 'workExperienceFullYears',
        key: 'workExperienceFullYears',
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

export default function Teachers() {
  
    const [ teachers, setTeachers ] = useState([]);

    const loadTeachers = async () => {
        const response = await getTeachers()
        setTeachers(response.data);
    }

    useEffect(() => {
        loadTeachers();
    }, []);

    return (
        <>
        <Space>
            <Button style={{ marginBottom: 10 }} type="primary">
                <Link to="create">Create New Teacher</Link>
            </Button>
        </Space>
        <Table columns={columns} dataSource={teachers} pagination={{ pageSize: 10 }} rowKey="id" />
    </>
    );
}
 
