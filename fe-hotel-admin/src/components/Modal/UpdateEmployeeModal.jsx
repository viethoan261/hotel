import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import actions from "../../redux/actions/employees";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const UpdateEmployeeModal = ({ employee, isUpdateEmployeeModalOpen, setIsUpdateEmployeeModalOpen, fetchEmployees }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        fullName: employee.fullName,
      });
    }
  }, [employee, form]);

  const dispatch = useDispatch();

  const handleCancel = () => {
    form.resetFields();
    setIsUpdateEmployeeModalOpen(false);
  };

  const handleSubmit = (values) => {
    dispatch(
      actions.updateEmployee(
        {
          id: employee.id,
          body: values,
        },
        () => fetchEmployees()
      )
    );
    form.resetFields();
    setIsUpdateEmployeeModalOpen(false);
  };

  return (
    <Modal title="Update Staff" footer={""} open={isUpdateEmployeeModalOpen} onCancel={handleCancel}>
      <Form
        style={{ maxWidth: 600 }}
        {...formItemLayout}
        autoComplete="off"
        form={form}
        onFinish={handleSubmit}
        initialValues={{ fullName: employee?.fullName }}
      >
        <Form.Item label="Fullname" name={"fullName"} rules={[{ required: true, message: "Please input fullname" }]}>
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
};

export default UpdateEmployeeModal;
