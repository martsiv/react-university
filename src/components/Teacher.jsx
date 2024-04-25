import React, { useEffect } from 'react';
import { Button, Form, Input, Space, DatePicker, InputNumber } from 'antd';
import { postTeacher } from '../services/teachers';

export default function CreateTeacherForm({ teacher }) {

    useEffect(() => {
        if (teacher) {
            form.setFieldsValue(teacher);
        }
    }, []);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        postTeacher(values)
    };
    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <h1>Create New Teacher</h1>
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
                    name="workExperienceFullYears"
                    label="workExperienceFullYears"
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
                            placeholder="Enter your work experience in years"
                        />
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