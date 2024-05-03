import { Button, message, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { teachersService } from "../services/teachers";
import { Link } from "react-router-dom";
import { toLocalDate } from "../utils/utils";

function getColumns(deleteHandler) {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Birth date",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (date) => <span>{toLocalDate(date)}</span>,
    },
    {
      title: "Work experience full years",
      dataIndex: "workExperienceFullYears",
      key: "workExperienceFullYears",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`edit/${record.id}`}>
            <Button icon={<EditOutlined />}></Button>
          </Link>
          <Popconfirm
            title="Delete the teacher"
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
  ];
}

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  const loadTeachers = async () => {
    const response = await teachersService.get();
    setTeachers(response.data);
  };

  const deleteTeacher = async (id) => {
    console.log("Deleting teacher: ", id);

    const res = await teachersService.delete(id);

    if (res.status === 200) {
      setTeachers(teachers.filter((x) => x.id !== id));
      message.success("Teacher deleted successfully!");
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <>
      <Button style={{ marginBottom: 10 }} type="primary">
        <Link to="create">Create New Teacher</Link>
      </Button>
      <Table
        columns={getColumns(deleteTeacher)}
        dataSource={teachers}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </>
  );
}
