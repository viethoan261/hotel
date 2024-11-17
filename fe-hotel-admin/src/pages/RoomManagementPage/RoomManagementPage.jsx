import { Button, Popconfirm, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import AddRoomModal from "../../components/Modal/AddRoomModal";
import { AVAILABLE_COLOR, BOOKED_COLOR } from "../../config/consts";
import actions from "../../redux/actions/rooms";
import utils from "../../utils";
import UpdateRoomModal from "../../components/Modal/UpdateRoomModal";
import { MdBlock } from "react-icons/md";
import { HiOutlineLockOpen } from "react-icons/hi";

export default function RoomManagementPage() {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isUpdateRoomModalOpen, setIsUpdateRoomModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const dispatch = useDispatch();

  const renderStatusStyle = (status) => {
    switch (status) {
      case "FREE":
        return "green";
      case "PENDING":
        return "red";
      case "PROGRESS":
        return "blue";
      case "BLOCK":
        return "grey";
    }
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      align: "center",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (status) => (
        <Tag color={renderStatusStyle(status)} key={status}>
          {utils.parseRoomStatus(status)}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (record) => (
        <div className="flex items-center justify-center gap-2" key={record.id}>
          {record.status !== "BLOCK" ? (
            <Tooltip title="Block room">
              <Popconfirm
                title="Do you want to block this room?"
                description="Are you sure to block this room?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleBlockRoom(record.id)}
              >
                <MdBlock />
              </Popconfirm>
            </Tooltip>
          ) : (
            <Tooltip title="Unblock room">
              <Popconfirm
                title="Do you want to unblock this room?"
                description="Are you sure to unblock this room?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleUnblockRoom(record.id)}
              >
                <HiOutlineLockOpen />
              </Popconfirm>
            </Tooltip>
          )}
          <Tooltip title="Update Room">
            <AiFillEdit
              onClick={() => {
                setIsUpdateRoomModalOpen(true);
                setCurrentRecord(record);
              }}
            />
            <UpdateRoomModal
              isUpdateRoomModalOpen={isUpdateRoomModalOpen}
              setUpdateRoomModalOpen={setIsUpdateRoomModalOpen}
              room={currentRecord}
              fetchRooms={fetchRooms}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const fetchRooms = () => {
    dispatch(actions.getRoom());
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const rooms = useSelector((state) => state.room_reducer).rooms;

  const handleBlockRoom = (roomId) => {
    dispatch(actions.blockRoom(roomId, () => fetchRooms()));
  };

  const handleUnblockRoom = (roomId) => {
    dispatch(actions.unblockRoom(roomId, () => fetchRooms()));
  };

  return (
    <div className="w-full ">
      <div className="w-full mb-10 flex justify-end">
        <Button onClick={() => setIsAddRoomModalOpen(true)}>Add new room</Button>
        <AddRoomModal
          isAddRoomModalOpen={isAddRoomModalOpen}
          setAddRoomModalOpen={setIsAddRoomModalOpen}
          fetchRooms={fetchRooms}
        />
      </div>
      <div className="w-full">
        <Table columns={columns} dataSource={rooms} rowKey="id" pagination={{ pageSize: 10 }}></Table>
      </div>
    </div>
  );
}
