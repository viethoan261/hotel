import React from "react";
import { Button, Modal, Popconfirm, Table, Tag, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions/services";
import { useEffect } from "react";
import { useState } from "react";
import CreateServiceModal from "../../components/Modal/CreateServiceModal";
import { BiBlock } from "react-icons/bi";
import { AiFillEdit, AiFillUnlock } from "react-icons/ai";
import UpdateServiceModal from "../../components/Modal/UpdateServiceModal";

export default function ServiceManagementPage() {
  const [_isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [_isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [_record, setRecord] = useState(null);

  const handleInactiveService = (serviceId) => {
    dispatch(actions.inactiveService(serviceId, () => fetchService()));
  };

  const handleActiveService = (serviceId) => {
    dispatch(actions.activeService(serviceId, () => fetchService()));
  };

  const renderActiveStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "green";
      case "INACTIVE":
        return "red";
      default:
        return "";
    }
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Status",
      align: "center",
      key: "status",
      dataIndex: "status",
      render: (status, index) => (
        <Tag key={index} color={renderActiveStyle(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      align: "center",
      key: "actions",
      render: (record, index) => (
        <div key={record.id}>
          <div className="flex items-center justify-center gap-4">
            <Tooltip title="Update Service">
              <AiFillEdit
                onClick={() => {
                  setIsUpdateModalOpen(true);
                  setRecord(record);
                }}
              />
              <UpdateServiceModal
                isOpen={_isUpdateModalOpen}
                setIsOpen={setIsUpdateModalOpen}
                service={_record}
                fetchService={fetchService}
              />
            </Tooltip>
            {record.status === "INACTIVE" ? (
              <Popconfirm
                title="Active service"
                description="Do you want to active this service"
                onConfirm={() => handleActiveService(record.id)}
              >
                <Tooltip title="Active Service">
                  <AiFillUnlock />
                </Tooltip>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="Inactive service"
                description="Do you want to inactive this service"
                onConfirm={() => handleInactiveService(record.id)}
              >
                <Tooltip title="Inactive Service">
                  <BiBlock />
                </Tooltip>
              </Popconfirm>
            )}
          </div>
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();

  const fetchService = () => {
    dispatch(actions.getService());
  };

  useEffect(() => {
    fetchService();
  }, []);

  const service = useSelector((state) => state.service_reducer).service;

  return (
    <div className="w-full ">
      <div className="w-full mb-10 flex justify-end">
        <Button onClick={() => setIsCreateModalOpen(true)}>Create new Service</Button>
        <CreateServiceModal isOpen={_isCreateModalOpen} setIsOpen={setIsCreateModalOpen} fetchService={fetchService} />
      </div>
      <div className="w-full">
        <Table columns={columns} dataSource={service} rowKey="id" pagination={{ pageSize: 10 }} />
      </div>
    </div>
  );
}
