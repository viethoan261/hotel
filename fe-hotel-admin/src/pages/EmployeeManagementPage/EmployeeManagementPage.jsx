import { Button, Popconfirm, Table, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { HiOutlineLockOpen } from "react-icons/hi";
import { AddEmployeeModal } from "../../components/Modal/AddEmployeeModal";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions/employees";
import UpdateEmployeeModal from "../../components/Modal/UpdateEmployeeModal";

const EmployeeManagementPage = () => {
  const dispatch = useDispatch();
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isUpdateEmployeeModalOpen, setIsUpdateEmployeeModalOpen] =
    useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const columns = [
    {
      title: "Fullname",
      key: "fullname",
      dataIndex: "fullName",
      align: "center",
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "userName",
      align: "center",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "position",
      align: "center",
      render: (role) => (
        <div>{role === "ROLE_MANAGER" ? "MANAGER" : "STAFF"}</div>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "isActive",
      align: "center",
      render: (value) =>
        value ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="gray">Inactive</Tag>
        ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (record) => (
        <div className="flex items-center justify-center gap-2" key={record.id}>
          <Tooltip title="Update ">
            <AiFillEdit
              onClick={() => {
                setIsUpdateEmployeeModalOpen(true);
                setCurrentRecord(record);
              }}
            />
            <UpdateEmployeeModal
              employee={currentRecord}
              isUpdateEmployeeModalOpen={isUpdateEmployeeModalOpen}
              setIsUpdateEmployeeModalOpen={setIsUpdateEmployeeModalOpen}
              fetchEmployees={fetchEmployees}
            />
          </Tooltip>

          <Tooltip title="Toggle Status">
            <Popconfirm
              title="Do you want to change status?"
              okText="Yes"
              cancelText="No"
              onConfirm={() =>
                dispatch(
                  actions.toggleEmployee(
                    {
                      id: record.id,
                    },
                    () => fetchEmployees()
                  )
                )
              }
            >
              <HiOutlineLockOpen />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  const fetchEmployees = () => {
    dispatch(actions.getEmployee());
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const employees = useSelector((state) => state.employee_reducer.employees);

  return (
    <div className="w-full ">
      <div className="w-full mb-10 flex justify-end">
        <Button onClick={() => setIsAddEmployeeModalOpen(true)}>
          Add new staff
        </Button>

        <AddEmployeeModal
          isAddEmployeeModalOpen={isAddEmployeeModalOpen}
          setIsAddEmployeeModalOpen={setIsAddEmployeeModalOpen}
          fetchEmployees={fetchEmployees}
        />
      </div>
      <div className="w-full">
        <Table
          columns={columns}
          dataSource={employees}
          rowKey={"id"}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
