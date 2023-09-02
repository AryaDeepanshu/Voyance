import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { updateUser } from "../redux/userSlice";
import { Close, Edit } from "@mui/icons-material";
import { ProfileUpdated } from "../utils/notification";

const Container = styled.div`
  height: max-content;
  width: 100%;
  flex: 1.6;
`;

const Heading = styled.div`
  font-family: "Bree Serif", serif;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ControlContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  gap: 10px;
`;

const EditContainer = styled.div`
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  }
`;

const CloseContainer = styled.div`
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
  }
`;

const InformationContainer = styled.div`
  border: 1px solid lightgray;
  padding: 10px;
`;

const DetailWrapper = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

const DetailContainer = styled.div`
  gap: 5px;
  display: flex;
  align-items: flex-start;
  height: max-content;
`;

const Label = styled.p`
  font-family: "Bree Serif", serif;
  font-weight: 500;
  width: 100px;
`;

const Input = styled.input`
  margin-top: 4px;
  outline: ${(props) => (props.enableEdit === true ? "" : "none")};
  border: ${(props) =>
    props.enableEdit === true ? "0.5px solid #d3d3d3" : "none"};
  background-color: white;
  font-family: "Josefin Sans", sans-serif;
  font-size: 1rem;
  padding: 2px;
  width: 100%;

  ::placeholder {
    font-size: 1rem;
    font-family: "Josefin Sans", sans-serif;
  }
`;

const TextInput = styled.textarea`
  outline: ${(props) => (props.enableEdit === true ? "" : "none")};
  border: ${(props) =>
    props.enableEdit === true ? "0.5px solid #d3d3d3" : "none"};
  background-color: white;
  font-family: "Josefin Sans", sans-serif;
  font-size: 1rem;
  padding: 2px;
  width: 100%;
  height: 100px;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
  ::placeholder {
    font-size: 1rem;
    font-family: "Josefin Sans", sans-serif;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Button = styled.button`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  width: 150px;
  padding: 10px 0px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: #0ead69;

  :hover {
    opacity: 0.5;
    transition: 0.5 all;
  }
`;

const ProfileInfo = ({ setProfileImage }) => {
  const dispatch = useDispatch();

  /* Get the Logged-In user from Redux State */
  const user = useSelector((store) => store.user.currentUser);

  const [enableEdit, setEnableEdit] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});

  const updateInfo = (event) => {
    setProfileInfo({
      ...profileInfo,
      [event.target.name]: event.target.value,
    });
  };

  /* Get required data using Redux State and then populate Input Field state: */
  useEffect(() => {
    setProfileInfo({
      bio: user.bio,
      name: user.name,
      email: user.email,
      phone: user.phone,
      country: user.country,
    });

    setProfileImage(user.avatar);
  }, []);

  /* re-initialize the user information: */
  const Cancel = () => {
    setProfileInfo({
      bio: user?.bio,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      country: user?.country,
    });

    setProfileImage(user.avatar);
    setEnableEdit(false);
  };

  /* update profile information: */
  const update = async () => {
    /* upload the new profile information to the Mongodb Database: */
    const updatedInfo = await axiosBaseURL.post(
      `user/updateInfo/${user?._id}`,
      {
        ...profileInfo,
      }
    );

    /* update the Global Redux State: */
    dispatch(updateUser(updatedInfo.data));
    setEnableEdit(false);
    ProfileUpdated();
  };

  return (
    <Container>
      <InformationContainer>
        <Heading>
          About
          <ControlContainer>
            <EditContainer onClick={() => setEnableEdit(true)}>
              <Edit />
            </EditContainer>
            {enableEdit && (
              <CloseContainer onClick={Cancel}>
                <Close />
              </CloseContainer>
            )}
          </ControlContainer>
        </Heading>

        <DetailWrapper>
          {/* Name: */}
          <DetailContainer>
            <Label>Name:</Label>

            <Input
              name="name"
              enableEdit={enableEdit}
              disabled={!enableEdit}
              value={profileInfo?.name}
              onChange={updateInfo}
            />
          </DetailContainer>

          {/* Email */}
          <DetailContainer>
            <Label>Email:</Label>
            <Input
              name="email"
              disabled={true}
              value={profileInfo?.email}
              onChange={updateInfo}
            />
          </DetailContainer>

          {/* Country: */}
          <DetailContainer>
            <Label>Country:</Label>
            <Input
              name="country"
              enableEdit={enableEdit}
              disabled={!enableEdit}
              value={profileInfo?.country}
              onChange={updateInfo}
            />
          </DetailContainer>

          {/* Phone Number: */}
          <DetailContainer>
            <Label>Phone No:</Label>
            <Input
              name="phone"
              enableEdit={enableEdit}
              disabled={!enableEdit}
              value={profileInfo?.phone}
              onChange={updateInfo}
              type="number"
            />
          </DetailContainer>

          {/* Bio */}
          <DetailContainer>
            <Label>Bio:</Label>
            <TextInput
              name="bio"
              enableEdit={enableEdit}
              disabled={!enableEdit}
              value={profileInfo?.bio}
              onChange={updateInfo}
            />
          </DetailContainer>
        </DetailWrapper>

        {enableEdit && (
          <ButtonWrapper>
            <Button onClick={update}>update</Button>
          </ButtonWrapper>
        )}
      </InformationContainer>
    </Container>
  );
};

export default ProfileInfo;
