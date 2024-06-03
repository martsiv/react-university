import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, message, DatePicker } from "antd";
import { eventsService } from "../services/events";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";


let lessonEvent = null;

export default function CreateLessonEventForm() {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const loadInitialLessonEvent = async () => {
    if (params.id) {
      setEditMode(true);

      const res = await eventsService.getById(params.id);

      if (res.status !== 200) return; // todo: throw exception

      res.data.startDateTime = moment(res.data.startDateTime).format('MM-DD-YYYY');
      res.data.endDateTime = moment(res.data.endDateTime).format('MM-DD-YYYY');

      lessonEvent = res.data;
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    loadInitialLessonEvent();
  }, []);

  const onFinish = async (values) => {
    console.log(values);

    if (editMode) {
      values.id = lessonEvent.id;

      const res = await eventsService.edit(values);

      if (res.status === 200) {
        message.success("Lesson event edited successfully!");
      }
    } else {
      // send to server
      try {
        const res = await eventsService.create(values);

        if (res.status === 200) {
          message.success("Lesson event created successfully!");
        }
      }
      catch (ex)
      {
        console.log(ex);
      }
    }

    navigate(-1);
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
    <h1 style={{ textAlign: "center" }}>
      {editMode ? "Edit" : "Create"} Lesson Event
    </h1>
    <Form
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        margin: "auto",
      }}
      layout="vertical"
    >
      <Form.Item
        name="summary"
        label="Summary"
        initialValue="Lecture Schedule"
        rules={[
          {
            required: true,
            message: "Please enter the summary",
          },
        ]}
        style={{
          flexGrow: 1,
        }}
      >
        <Input placeholder="Enter summary" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        initialValue="Lecture for the upcoming semester."
        rules={[
          {
            required: true,
            message: "Please enter the description",
          },
        ]}
        style={{
          flexGrow: 1,
        }}
      >
        <Input placeholder="Enter description" />
      </Form.Item>

      <div style={col2}>
      <Form.Item
          name="startDateTime"
          label="Start Date Time"
          rules={[
            {
              required: true,
              message: "Please select Start Date Time",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} format="MM-DD-YYYY"/>
        </Form.Item>

        <Form.Item
          name="endDateTime"
          label="End Date Time"
          rules={[
            {
              required: true,
              message: "Please select End Date Time",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} format="MM-DD-YYYY"/>
        </Form.Item>
      </div>

      <Form.Item
        name="calendarId"
        label="Calendar ID"
        initialValue="primary"
        rules={[
          {
            required: true,
            message: "Please enter the calendar ID",
          },
        ]}
        style={{
          flexGrow: 1,
        }}
      >
        <Input placeholder="Enter calendar ID" />
      </Form.Item>

      <Form.Item
        name="timeZone"
        label="Time Zone"
        initialValue="America/Los_Angeles"
        rules={[
          {
            required: true,
            message: "Please enter the time zone",
          },
        ]}
        style={{
          flexGrow: 1,
        }}
      >
        <Input placeholder="Enter time zone" />
      </Form.Item>

      <Form.Item
        name="teacherId"
        label="Teacher ID"
        initialValue={1}
        rules={[
          {
            required: true,
            message: "Please enter the teacher ID",
          },
        ]}
        style={{
          flexGrow: 1,
        }}
      >
        <Input type="number" placeholder="Enter teacher ID" />
      </Form.Item>

      <Form.Item
        style={{
          textAlign: "center",
        }}
      >
        <Space>
          <Button type="primary" htmlType="submit">
            {editMode ? "Edit" : "Create"}
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  </>
  );
}

const col2 = {
  display: "flex",
  gap: 10,
};
