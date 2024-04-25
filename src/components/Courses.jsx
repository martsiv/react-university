import { Table } from "antd";
import { useEffect, useState } from "react";


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

const api = "https://university-web.azurewebsites.net/api/Courses";

export default function Courses() {
  
    const [ courses, setCourses ] = useState([]);

    const loadCourses = async () => {
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        setCourses(data);
    }

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <Table columns={columns} dataSource={courses} pagination={{ pageSize: 10 }} rowKey="id" />
    );
}
 
