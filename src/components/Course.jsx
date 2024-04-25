import React, { useEffect } from 'react';
import { Button, Form, Input, Space, DatePicker, InputNumber } from 'antd';
import { postCourse } from '../services/courses';

export default function CreateCourseForm({ course }) {

    useEffect(() => {
        if (course) {
            form.setFieldsValue(course);
        }
    }, []);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        postCourse(values)
    };
    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <h1>Create New Course</h1>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                    margin: "auto"
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
                        flexGrow: 1
                    }}

                >
                    <Input placeholder="Enter first name" />
                </Form.Item>

                <div style={col2}>

                <Form.Item
                    name="teacherId"
                    label="teacherId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        flexGrow: 1
                    }}

                >
                    <InputNumber
                            style={{
                                width: '100%',
                            }}
                            prefix="years"
                            placeholder="Enter teacher ID"
                        />
                </Form.Item>
                </div>

                <Form.Item style={{
                    textAlign: "center"
                }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};

const col2 = {
    display: "flex",
    gap: 10
}