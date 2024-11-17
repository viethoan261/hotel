import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions/login";

const { Title } = Typography;
const LoginPage = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(actions.login(values));
  };

  const state = useSelector((state) => state.login_reducer);

  return (
    <div className="fixed top-0 h-screen w-full flex flex-col items-center justify-center bg-blue-300">
      <Form
        name="normal_login"
        className="login-form  px-10 py-5 rounded-xl shadow-2xl  bg-white"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h4 className="w-full text-center mb-8 font-bold text-xl">LOGIN</h4>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item className="mt-8">
          <Button type="primary" htmlType="submit" className="login-form-button w-full">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
