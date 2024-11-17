import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { storage } from "../../config/firebase";
import actions from "../../redux/actions/rooms";
import utils from "../../utils";

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const UpdateRoomModal = ({ isUpdateRoomModalOpen, setUpdateRoomModalOpen, room, fetchRooms }) => {
  const [form] = Form.useForm();

  const [_roomName, setRoomName] = useState("");
  const [_roomType, setRoomType] = useState("");
  const [_roomPrice, setRoomPrice] = useState();
  const [_roomDescription, setRoomDescription] = useState("");
  const [_fileImage, setFileImage] = useState(null);
  const [_imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (room) {
      form.setFieldsValue({
        name: room.name,
        type: room.type,
        price: room.price,
        description: room.description,
      });
    }
  }, [room, form]);
  const updateRoom = (data) => {
    dispatch(
      actions.udpateRoom(
        {
          roomId: room.id,
          body: data,
        },
        () => fetchRooms()
      )
    );
  };

  const handleOk = (value) => {
    if (_fileImage == null) {
      Object.assign(value, { image: room?.image });
      updateRoom(value);
    } else {
      const imageRef = ref(storage, `images/${_fileImage.name + _fileImage.uid}`);
      uploadBytes(imageRef, _fileImage)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open("GET", url);
          xhr.send();
          value[image] == url;
          const data = {
            name: value.name,
            price: value.price,
            description: value.description,
            type: value.type,
            image: url,
          };
          updateRoom(data);
        });
    }
    form.resetFields();
    setUpdateRoomModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setUpdateRoomModalOpen(false);
  };

  return (
    <Modal title="Update room" open={isUpdateRoomModalOpen} onCancel={handleCancel} footer={""}>
      <Form
        style={{ maxWidth: 600 }}
        {...formItemLayout}
        form={form}
        autoComplete="off"
        onFinish={handleOk}
        initialValues={{
          name: room?.name,
          type: room?.type,
          price: room?.price,
          description: room?.description,
          //   image: room?.image,
        }}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the room name!" }]}>
          <Input value={_roomName} onChange={(e) => setRoomName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Type" name="type" rules={[{ required: true, message: "Please select the room type!" }]}>
          <Select value={_roomType} onChange={(value) => setRoomType(value)} placeholder="Select a room type">
            <Select.Option value="SINGLE">SINGLE</Select.Option>
            <Select.Option value="DOUBLE">DOUBLE</Select.Option>
            <Select.Option value="VIP">VIP</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the room description!" }]}
        >
          <Input value={_roomType} onChange={(e) => setRoomDescription(e.target.value)} />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input the room price!" }]}>
          <InputNumber value={_roomType} onChange={(number) => setRoomPrice(number)} />
        </Form.Item>

        <Form.Item name="image" label="Image">
          <input type={"file"} onChange={(e) => setFileImage(e.target.files[0])}></input>
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

export default UpdateRoomModal;
