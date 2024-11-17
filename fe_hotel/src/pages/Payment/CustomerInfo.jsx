import React, { useContext } from "react";
import { FormButton, Text } from "../../components/GlobalStyles/PageStyles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Layout } from "./CommonStyles";
import { Context } from "../../contexts/contexts";
import { Input, InputContainer } from "../../components/GlobalStyles/FormStyles";
import { toast } from "react-toastify";
import { Paths, ToastConfig } from "../../constants";
import { getTotalPrice } from "../../utils/helperFunction";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const CustomerInfo = ({ _userInfo, setUserInfo }) => {
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateFormInput = () => {
    if (_userInfo.fullname == "") return "Your fullname is required";
    if (_userInfo.tel == "") return "Your phone number is required";
    if (_userInfo.idCard == "") return "Your Id card is required";
    if (!isValidEmail(_userInfo.email) && _userInfo.email != "") return "Email is invalid.";
    return "";
  };

  const handleConfirmButton = (e) => {
    e.preventDefault();
    if (validateFormInput() !== "") toast.warning(`${validateFormInput()}`, ToastConfig);
    else {
      //Request
      navigate(`${Paths.payment}/2`, { state: _userInfo });
    }
  };

  const roomList = useSelector((state) => state).roomlist_reducer.roomlist;
  const time = useSelector((state) => state).time_reducer;
  const checkInTime = new Date(time.checkIn);
  const checkOutTime = new Date(time.checkOut);
  const hours = Math.ceil((checkOutTime - checkInTime) / (1000 * 60 * 60));
  console.log(hours);
  return (
    <>
      <Layout>
        <div className="section">
          <Text>Customer Info</Text>
          <InputContainer>
            <label>ID Card</label>
            <Input value={_userInfo.idCard} onChange={(e) => setUserInfo({ ..._userInfo, idCard: e.target.value })} />
          </InputContainer>
          <InputContainer>
            <label>Fullname</label>
            <Input value={_userInfo.fullname} onChange={(e) => setUserInfo({ ..._userInfo, fullname: e.target.value })} />
          </InputContainer>
          <InputContainer>
            <label>Address</label>
            <Input value={_userInfo.address} onChange={(e) => setUserInfo({ ..._userInfo, address: e.target.value })} />
          </InputContainer>
          <InputContainer>
            <label>Tel</label>
            <Input value={_userInfo.tel} onChange={(e) => setUserInfo({ ..._userInfo, tel: e.target.value })} />
          </InputContainer>
          <InputContainer>
            <label>Email</label>
            <Input
              type={"email"}
              value={_userInfo.email}
              onChange={(e) => setUserInfo({ ..._userInfo, email: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <label>Note</label>
            <Input value={_userInfo.note} onChange={(e) => setUserInfo({ ..._userInfo, note: e.target.value })} />
          </InputContainer>
        </div>
        <div className="section">
          <Text>Booking Info</Text>
          <Wrapper>
            <Text style={{ fontWeight: "bolder" }} className="small">
              Room Number
            </Text>
            <Text style={{ fontWeight: "bolder" }} className="small">
              Price($)
            </Text>
          </Wrapper>
          {roomList.map((room, index) => (
            <Wrapper key={index}>
              <Text className="small">Room {room.name}</Text>
              <Text className="small"> {room.price * hours}</Text>
            </Wrapper>
          ))}
        </div>
      </Layout>
      <Layout className="buttons">
        <FormButton onClick={() => navigate(Paths.room)}>Go Back</FormButton>
        <FormButton onClick={(e) => handleConfirmButton(e)}>Confirm</FormButton>
      </Layout>
    </>
  );
};

export default CustomerInfo;
