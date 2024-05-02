import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, message, DatePicker } from "antd";
import { studentsService } from "../services/students";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";


let student = null;

export default function CreateStudentForm() {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const loadInitialStudent = async () => {
    if (params.id) {
      setEditMode(true);

      const res = await studentsService.getById(params.id);

      if (res.status !== 200) return; // todo: throw exception

      res.data.birthDate = moment(res.data.birthDate);

      student = res.data;
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    loadInitialStudent();
  }, []);

  const onFinish = async (values) => {
    console.log(values);

    if (editMode) {
      values.id = student.id;

      const res = await studentsService.edit(values);

      if (res.status === 200) {
        message.success("Student edited successfully!");
      }
    } else {
      // send to server
      try {
        const res = await studentsService.create(values);

        if (res.status === 200) {
          message.success("Student created successfully!");
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
        {editMode ? "Edit" : "Create"} Student
      </h1>{" "}
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
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            flexGrow: 1,
          }}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <div style={col2}>
          <Form.Item
            name="surname"
            label="surname"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              flexGrow: 1,
            }}
          >
            <Input placeholder="Enter surname name" />
          </Form.Item>

        <Form.Item
          name="birthDate"
          label="birthDate"
          rules={[
            {
              required: true,
              message: "Please select birth date",
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY"/>
        </Form.Item>

        </div> 


        <Form.Item
          name="groupName"
          label="groupName"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            flexGrow: 1,
          }}
        >
          <Input placeholder="Enter group name" />
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
