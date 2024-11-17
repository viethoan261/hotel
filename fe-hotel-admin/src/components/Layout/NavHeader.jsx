import * as React from "react";
import { Layout, Dropdown, Menu } from "antd";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../config/routers";
const { Header } = Layout;

const NavHeader = ({ title }) => {
  const userInfo = JSON.parse(localStorage.getItem("decodedToken"));
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(ROUTERS.LOGIN);
    localStorage.clear();
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background h-16 flex items-center justify-end text-white font-bold">
      <div className="">Hello {userInfo.sub}</div>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        className="flex items-center text-white ml-2"
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <IoMdArrowDropdown />
        </a>
      </Dropdown>
    </Header>
  );
};

export default NavHeader;
