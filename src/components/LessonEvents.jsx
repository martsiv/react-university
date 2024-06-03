import { Button, message, Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { eventsService } from "../services/events";
import { oAuthService } from "../services/oAuthService";
import { Link } from "react-router-dom";

function getColumns(deleteHandler, addEventHandler) {
  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Summary",
      dataIndex: "summary",
      key: "summary",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Calendar Id",
      dataIndex: "calendarId",
      key: "calendarId",
    },
    {
      title: "Time Zone",
      dataIndex: "timeZone",
      key: "timeZone",
    },
    {
      title: "Teacher Id",
      dataIndex: "teacherId",
      key: "teacherId",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <Link to={`edit/${record.id}`}>
            <Button icon={<EditOutlined />}></Button>
          </Link> */}
          <Popconfirm
            title="Delete the event"
            description={`Are you sure to delete ${record.summary}?`}
            onConfirm={() => deleteHandler(record.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Button danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
          <Popconfirm
            title="Add event to calendar"
            description={`Are you sure to add ${record.summary} to tour calendar?`}
            onConfirm={() => addEventHandler(record.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Button icon={<UserAddOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
}

export default function LessonEvents() {
  const [lessonEvents, setLessonEvents] = useState([]);

  const loadLessonEvents = async () => {
    const response = await eventsService.get();
    setLessonEvents(response.data);
  };

  const deleteLessonEvent = async (id) => {
    console.log("Deleting lesson event: ", id);

    const res = await eventsService.delete(id);

    if (res.status === 200) {
      setLessonEvents(lessonEvents.filter((x) => x.id !== id));
      message.success("Lesson event deleted successfully!");
    }
  };
  const addLessonEvent = async (id) => {
    console.log("Adding lesson event: ", id);

    const authRes = await oAuthService.authorize(false);
    if (authRes.status !== 200){
      return message.error("Error authentication!");
    }

    const res = await eventsService.add(id);

    if (res.status === 200) {
      // setLessonEvents(lessonEvents.filter((x) => x.id !== id));
      message.success("Lesson event deleted successfully!");
    }
  };

  useEffect(() => {
    loadLessonEvents();
  }, []);

  return (
    <>
      <Space>
        <Button style={{ marginBottom: 10 }} type="primary">
          <Link to="create">Create New Lesson event</Link>
        </Button>
      </Space>
      <Table
        columns={getColumns(deleteLessonEvent, addLessonEvent)}
        dataSource={lessonEvents}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </>
  );
}
