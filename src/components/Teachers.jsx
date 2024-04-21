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

const api = "http://asp-net-clean-architecture.somee.com/api/Teachers";

export default function Teachers() {
  
    const [ teachers, setTeachers ] = useState([]);

    const loadTeachers = async () => {
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        setTeachers(data);
    }

    useEffect(() => {
        loadTeachers();
    }, []);

    return (
        <Table columns={columns} dataSource={teachers} pagination={{ pageSize: 10 }} rowKey="id" />
    );
}
 
