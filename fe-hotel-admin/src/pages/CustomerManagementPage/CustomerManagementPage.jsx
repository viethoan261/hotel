import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions/customers";

const CustomerManagementPage = () => {
  const columns = [
    {
      title: "Full name",
      key: "fullname",
      dataIndex: "fullName",
      align: "center",
    },
    {
      title: "Tel",
      key: "tel",
      dataIndex: "tel",
      align: "center",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "ID card",
      key: "id_card",
      dataIndex: "idCard",
      align: "center",
    },
  ];

  const dispatch = useDispatch();

  const fetchCustomers = () => {
    dispatch(actions.getCustomer());
  };

  useEffect(() => fetchCustomers(), []);

  const customers = useSelector((state) => state.customer_reducer.customers);

  return (
    <div className="w-full">
      <Table columns={columns} dataSource={customers} rowKey={"key"} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default CustomerManagementPage;
