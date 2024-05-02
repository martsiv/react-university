import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, InputNumber, message, Select } from "antd";
import { coursesService } from "../services/courses";
import { teachersService } from "../services/teachers";
import { useNavigate, useParams } from "react-router-dom";

let course = null;

export default function CreateCourseForm() {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [teachers, setTeachers] = useState([]);

  const loadTeachers = async () => {
    const response = await teachersService.get();

    // change property names: id -> value, name -> label
    const mapped = response.data.map(function (x) { return { value: x.id, label: `${x.name} ${x.surname}`} });
    setTeachers(mapped);
}

  const loadInitialCourse = async () => {
    if (params.id) {
      setEditMode(true);

      const res = await coursesService.getById(params.id);
      if (res.status !== 200) return; // todo: throw exception
      
      res.data.teacherId = res.data.teacher.id;

      course = res.data;
      form.setFieldsValue(res.data);
    }
  };

  useEffect(() => {
    loadTeachers();
    loadInitialCourse();
  }, []);

  const onFinish = async (values) => {
    console.log(values);

    if (editMode) {
      values.id = course.id;

      const res = await coursesService.edit(values);

      if (res.status === 200) {
        message.success("Course edited successfully!");
      }
    } else {
      // send to server
      const res = await coursesService.create(values);

      if (res.status === 200) {
        message.success("Course created successfully!");
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
        {editMode ? "Edit" : "Create"} Course
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
          <Input placeholder="Enter course name" />
        </Form.Item>

        <div style={col2}>
          {/* <Form.Item
            name="teacherId"
            label="teacherId"
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
              placeholder="Enter teacher ID"
            />
          </Form.Item> */}
          <Form.Item
                    name="teacherId"
                    label="teacherId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a teacher"
                        options={teachers}>
                    </Select>
                </Form.Item>
        </div>

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
