import * as React from "react";
import { Menu, Layout } from "antd";
const { Sider } = Layout;
import { Link, useLocation } from "react-router-dom";
import utils from "../../utils";
import { ROUTERS } from "../../config/routers";

export default function SliderBar() {
  const location = useLocation();
  const path = location.pathname;
  const isAdmin = utils.isAdmin();

  const menuItems = isAdmin
    ? [
        {
          key: ROUTERS.ROOM_MANAGEMENT,
          label: <Link to={ROUTERS.ROOM_MANAGEMENT}>Room management</Link>,
        },
        {
          key: ROUTERS.BOOKING_MANAGEMENT,
          label: <Link to={ROUTERS.BOOKING_MANAGEMENT}>Booking management</Link>,
        },
        {
          key: ROUTERS.SERVICE_MANAGEMENT,
          label: <Link to={ROUTERS.SERVICE_MANAGEMENT}>Service management</Link>,
        },
        {
          key: ROUTERS.EMPLOYEE_MANAGEMENT,
          label: <Link to={ROUTERS.EMPLOYEE_MANAGEMENT}>Staff management </Link>,
        },
        {
          key: ROUTERS.CUSTOMER_MANAGEMENT,
          label: <Link to={ROUTERS.CUSTOMER_MANAGEMENT}>Customer management </Link>,
        },
        {
          key: ROUTERS.PROFIT_MANAGEMENT,
          label: <Link to={ROUTERS.PROFIT_MANAGEMENT}>Statistic </Link>,
        },
      ]
    : [
        {
          key: ROUTERS.ROOM_MANAGEMENT,
          label: <Link to={ROUTERS.ROOM_MANAGEMENT}>Room management</Link>,
        },
        {
          key: ROUTERS.BOOKING_MANAGEMENT,
          label: <Link to={ROUTERS.BOOKING_MANAGEMENT}>Booking management</Link>,
        },
        {
          key: ROUTERS.SERVICE_MANAGEMENT,
          label: <Link to={ROUTERS.SERVICE_MANAGEMENT}>Service management</Link>,
        },
        {
          key: ROUTERS.CUSTOMER_MANAGEMENT,
          label: <Link to={ROUTERS.CUSTOMER_MANAGEMENT}>Customer management </Link>,
        },
      ];
  return (
    <Sider
      width={250}
      style={{
        overflow: "auto",
        height: "100%",
        position: "fixed",
        left: 0,
      }}
    >
      <div className="logo text-white text-xl font-bold h-16 flex items-center justify-center w-full">Hotel Management</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[path !== ROUTERS.HOME ? path : ROUTERS.ROOM_MANAGEMENT]}
        className="mt-2 font-bold"
        items={menuItems}
      ></Menu>
    </Sider>
  );
}
