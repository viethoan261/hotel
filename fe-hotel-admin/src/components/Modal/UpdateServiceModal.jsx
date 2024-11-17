import React from "react";
import { Table, Button, Modal, Form, Input, InputNumber } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import actions from "../../redux/actions/services";
import { useEffect } from "react";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function UpdateServiceModal({ isOpen, setIsOpen, service, fetchService }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (service) {
      form.setFieldsValue({
        name: service.name,
        price: service.price,
        description: service.description,
      });
    }
  }, [service, form]);

  const handleUpdateService = (values) => {
    const body = {
      id: service.id,
      data: values,
    };
    dispatch(actions.updateService(body, () => fetchService()));
    setIsOpen(false);
    form.resetFields();
  };

  const handleCancelModal = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal title="Update Service" open={isOpen} onCancel={handleCancelModal} footer={null}>
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        {...formItemLayout}
        onFinish={handleUpdateService}
        autoComplete="off"
        initialValues={{
          name: service?.name,
          price: service?.price,
          description: service?.description,
        }}
      >
        <Form.Item label="Service Name" name="name" rules={[{ required: true, message: "Please input the service name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input the service price!" }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the service description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 20,
            span: 4,
          }}
        >
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
