import { Form, Modal, Button, Tabs, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import RoomServiceSelection from "../ServiceSelection/RoomServiceSelection";

const { TabPane } = Tabs;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function ServiceModal({
  isServiceModalOpen,
  setIsServiceModalOpen,
  record,
}) {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    if (isServiceModalOpen) {
      setRooms(record.rooms);
    }
  }, [isServiceModalOpen]);

  const [form] = Form.useForm();

  const handleCancelModal = () => {
    setIsServiceModalOpen(false);
    form.resetFields();
  };

  const handleFinishForm = () => {
    setIsServiceModalOpen(false);
    form.resetFields();
  };

  const RoomTabs = () => (
    <Tabs>
      {rooms.map((room) => (
        <TabPane tab={room.name} key={room.name}>
          <RoomServiceSelection roomId={room.id} bookingId={record.id} />
        </TabPane>
      ))}
    </Tabs>
  );

  return (
    <Modal
      title="Room Service"
      open={isServiceModalOpen}
      onCancel={() => handleCancelModal()}
      onOk={() => handleFinishForm()}
      footer={""}
    >
      <RoomTabs />
    </Modal>
  );
}
