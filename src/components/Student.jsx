import React, { useEffect } from 'react';
import { Button, Form, Input, Space, DatePicker } from 'antd';
import { postStudent } from '../services/students';

export default function CreateStudentForm({ student }) {

    useEffect(() => {
        if (student) {
            form.setFieldsValue(student);
        }
    }, []);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        postStudent(values)
    };
    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <h1>Create New Student</h1>
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
                    name="surname"
                    label="surname"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    style={{
                        flexGrow: 1
                    }}

                >
                    <Input placeholder="Enter surname name" />
                </Form.Item>

                    <Form.Item
                        name="datePicker"
                        label="DatePicker"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{ flexGrow: 1 }}
                    >
                        <DatePicker />
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
                        flexGrow: 1
                    }}

                >
                    <Input placeholder="Enter surname name" />
                </Form.Item>

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