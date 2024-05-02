import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, InputNumber, message, DatePicker } from "antd";
import { teachersService } from "../services/teachers";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

let teacher = null;

export default function CreateTeacherForm() {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const loadInitialTeacher = async () => {
    if (params.id) {
      setEditMode(true);

      const res = await teachersService.getById(params.id);

      if (res.status !== 200) return; // todo: throw exception

      res.data.birthDate = moment(res.data.birthDate);

      teacher = res.data;
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    loadInitialTeacher();
  }, []);

  const onFinish = async (values) => {
    console.log(values);

    if (editMode) {
      values.id = teacher.id;

      const res = await teachersService.edit(values);

      if (res.status === 200) {
        message.success("Teacher edited successfully!");
      }
    } else {
      // send to server
      const res = await teachersService.create(values);

      if (res.status === 200) {
        message.success("Teacher created successfully!");
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
        {editMode ? "Edit" : "Create"} Teacher
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
            <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
          </Form.Item>
        </div>

        <Form.Item
          name="workExperienceFullYears"
          label="workExperienceFullYears"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            flexGrow: 1,
          }}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
            prefix="years"
            placeholder="Enter your work experience in years"
          />
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
