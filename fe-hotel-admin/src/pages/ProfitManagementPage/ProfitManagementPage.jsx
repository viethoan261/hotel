import utils from "../../utils";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Tabs } from "antd";
import { RoomChart } from "../../components/Statistics/RoomChart";
import { MonthlyChart } from "../../components/Statistics/MonthlyChart";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions/statistics";
import { ServiceChart } from "../../components/Statistics/ServiceChart";
import { Navigate } from "react-router-dom";

const { TabPane } = Tabs;

export const ProfitManagementPage = () => {
  const isUserAdmin = utils.isAdmin();

  const dispatch = useDispatch();

  const getMonthlyStats = () => {
    dispatch(actions.getMonthlyStatistic());
  };

  const getRoomsStats = () => {
    dispatch(actions.getRoomsStatistic());
  };

  const getServicesStats = () => {
    dispatch(actions.getServicesStatistic());
  };

  useEffect(() => {
    getMonthlyStats();
    getRoomsStats();
    getServicesStats();
  }, []);

  const stats = useSelector((state) => state.statistics_reducer.monthlyStat);
  const roomStats = useSelector((state) => state.statistics_reducer.roomsStat);
  const serviceStats = useSelector(
    (state) => state.statistics_reducer.servicesStat
  );

  const items = [
    {
      key: "1",
      label: "Monthly Statistics",
      children: <MonthlyChart data={stats} />,
    },
    {
      key: "2",
      label: "Rooms Statistics",
      children: <RoomChart data={roomStats} />,
    },
    {
      key: "3",
      label: "Services Statistics",
      children: <ServiceChart data={serviceStats} />,
    },
  ];
  if (isUserAdmin) {
    return (
      <Tabs
        defaultActiveKey="1"
        items={items}
        // onChange={(key) => handleChangeTab(key)}
      ></Tabs>
    );
  } else {
    return <Navigate to="/room-management" />;
  }
};
