import { notification } from "antd";

const showNotification = (
  message = "title",
  description = "description",
  type = "success"
) => {
  notification[type]({
    message,
    description,
  });
};

const parseRoomStatus = (value) => {
  switch (value) {
    case "FREE":
      return "Free";
    case "PENDING":
      return "Pending";
    case "PROGRESS":
      return "PROGRESS";
    case "BLOCK":
      return "BLOCK";
  }
};

const parseBookingStatus = (isConfirmed) => {
  switch (isConfirmed) {
    case true:
      return "Confirmed";
    case false:
      return "Not confirmed";
    default:
      return;
  }
};

const isAdmin = () => {
  const role = JSON.parse(localStorage.getItem("decodedToken")).role[0];
  return role === "ROLE_MANAGER";
};

export default {
  showNotification,
  parseRoomStatus,
  parseBookingStatus,
  isAdmin,
};
