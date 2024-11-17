import { Button, Form, InputNumber, Select, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions/services";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const RoomServiceSelection = ({ roomId, bookingId }) => {
  const services = useSelector((state) => state.service_reducer).service.filter(
    (ele) => ele.status !== "INACTIVE"
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const fetchService = () => {
    dispatch(actions.getService());
  };

  useEffect(() => {
    fetchService();
  }, []);

  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceQuantities, setServiceQuantities] = useState({});

  const handleServiceSelect = (value) => {
    setSelectedServices(value);
    setServiceQuantities(
      value.reduce((acc, serviceId) => {
        return { ...acc, [serviceId]: { quantity: 1, saleoff: 0 } };
      }, {})
    );
  };

  const handleQuantityChange = (serviceId, value) => {
    setServiceQuantities({
      ...serviceQuantities,
      [serviceId]: { ...serviceQuantities[serviceId], quantity: value },
    });
  };

  const handleSelloffChange = (serviceId, value) => {
    setServiceQuantities({
      ...serviceQuantities,
      [serviceId]: { ...serviceQuantities[serviceId], saleoff: value },
    });
  };

  const handleSubmit = () => {
    const serviceData = selectedServices.map((serviceId) => ({
      id: serviceId,
      ...serviceQuantities[serviceId],
    }));

    dispatch(
      actions.orderService({
        bookingId: bookingId,
        body: [
          {
            roomID: roomId,
            services: serviceData,
          },
        ],
      })
    );
    form.resetFields();
  };

  return (
    <>
      <Select
        mode="multiple"
        placeholder="Please select services"
        onChange={handleServiceSelect}
        style={{ width: "100%" }}
      >
        {services.map((service) => (
          <Option key={service.id} value={service.id}>
            {service.name}
          </Option>
        ))}
      </Select>
      <Form
        onFinish={handleSubmit}
        style={{ maxWidth: "100%" }}
        form={form}
        autoComplete="off"
      >
        {selectedServices.map((serviceId) => (
          <div key={serviceId} className="mt-5">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  {services.find((service) => service.id === serviceId).name}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name={`quantity${serviceId}`}
                  label="Quantity"
                  wrapperCol={{
                    offset: 0,
                    span: 24,
                  }}
                >
                  <InputNumber
                    min={1}
                    defaultValue={1}
                    onChange={(value) => handleQuantityChange(serviceId, value)}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name={`sell${serviceId}`} label="Selloff">
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    onChange={(value) => handleSelloffChange(serviceId, value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ))}
        {selectedServices.length > 0 ? (
          <Form.Item
            wrapperCol={{
              offset: 18,
              span: 4,
            }}
          >
            <Button type="primary" htmlType="submit">
              Order Service
            </Button>
          </Form.Item>
        ) : null}
      </Form>
    </>
  );
};

export default RoomServiceSelection;
