import { Button, Form, Input, Modal, Typography } from "antd";
import utils from "../../utils";
import actions from "../../redux/actions/login";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const { Text } = Typography;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export const AddEmployeeModal = ({
  isAddEmployeeModalOpen,
  setIsAddEmployeeModalOpen,
  fetchEmployees,
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const handleSubmit = (value) => {
    console.log(value);
    dispatch(actions.register(value, () => fetchEmployees()));
    form.resetFields();
    setIsAddEmployeeModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddEmployeeModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Add New Staff"
        open={isAddEmployeeModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...formItemLayout}
          onFinish={(value) => handleSubmit(value)}
          form={form}
        >
          <Form.Item
            name={"fullname"}
            label="Fullname"
            rules={[{ required: true, message: "Please input the username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"username"}
            label="Username"
            rules={[{ required: true, message: "Please input the username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="Password"
            rules={[{ required: true, message: "Please input the password" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 4,
            }}
          >
            <Button htmlType="submit" type="primary">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
