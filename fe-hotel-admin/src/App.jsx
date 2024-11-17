import HomePage from "./pages/HomePage/HomePage";
import { useSelector } from "react-redux";
import "./App.css";
import "antd/dist/reset.css";
import LoginPage from "./components/LoginPage/LoginPage";
import RoomManagementPage from "./pages/RoomManagementPage/RoomManagementPage";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import WrapContainer from "./components/Layout/Layout";
import BookingManagementPage from "./pages/BookingManagementPage/BookingManagementPage";
import { ProfitManagementPage } from "./pages/ProfitManagementPage/ProfitManagementPage";
import ServiceManagementPage from "./pages/ServiceManagementPage/ServiceManagementPage";
import EmployeeManagementPage from "./pages/EmployeeManagementPage/EmployeeManagementPage";
import { BillDetails } from "./components/BillDetails/BillDetais";
import { ROUTERS } from "./config/routers";
import CustomerManagementPage from "./pages/CustomerManagementPage/CustomerManagementPage";

const AppLayout = () => (
  <ProtectedRoute>
    <WrapContainer>
      <Outlet />
    </WrapContainer>
  </ProtectedRoute>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTERS.HOME,
        element: <Navigate to={ROUTERS.ROOM_MANAGEMENT} />,
      },
      {
        path: ROUTERS.ROOM_MANAGEMENT,
        element: <RoomManagementPage />,
      },
      {
        path: ROUTERS.BOOKING_MANAGEMENT,
        element: <BookingManagementPage />,
      },
      {
        path: ROUTERS.BILLS,
        element: <BookingManagementPage />,
      },
      {
        path: "/bill-details/:bookingId",
        element: <BillDetails />,
      },
      {
        path: ROUTERS.SERVICE_MANAGEMENT,
        element: <ServiceManagementPage />,
      },
      {
        path: ROUTERS.EMPLOYEE_MANAGEMENT,
        element: <EmployeeManagementPage />,
      },
      {
        path: ROUTERS.PROFIT_MANAGEMENT,
        element: <ProfitManagementPage />,
      },
      {
        path: ROUTERS.CUSTOMER_MANAGEMENT,
        element: <CustomerManagementPage />,
      },
    ],
  },
  {
    element: <LoginPage />,
    path: ROUTERS.LOGIN,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
