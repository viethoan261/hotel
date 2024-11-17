import React from "react";
import { Table, Button, Modal, Form, Input, InputNumber } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import actions from "../../redux/actions/services";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function CreateServiceModal({
  isOpen,
  setIsOpen,
  fetchService,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [_name, setName] = useState("");
  const [_price, setPrice] = useState();
  const [_description, setDescription] = useState("");

  const handleCreateService = () => {
    const data = { name: _name, price: _price, description: _description };
    dispatch(actions.createService(data, () => fetchService()));
    setIsOpen(false);
    form.resetFields();
    // window.location.reload();
  };

  const handleCancelModal = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Add Service"
      open={isOpen}
      onCancel={handleCancelModal}
      footer=""
    >
      <Form
        form={form}
        style={{ maxWidth: 600 }}
        {...formItemLayout}
        onFinish={handleCreateService}
      >
        <Form.Item
          label="Service Name"
          name="name"
          rules={[
            { required: true, message: "Please input the service name!" },
          ]}
        >
          <Input value={_name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input the service price!" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            value={_price}
            onChange={(value) => setPrice(value)}
          />
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
          <Input
            value={_description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 20,
            span: 4,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
