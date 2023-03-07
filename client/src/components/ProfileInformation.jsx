import { Close, Edit } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AuthorHotelReview from "./AuthorHotelReview";
import TripCard from "./TripCard";
import { desktop, mobile, largeMobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { individualUpload } from "../utils/fileUpload";
import axios from "axios";
import { updateUser } from "../redux/userSlice";

const Wrapper = styled.div`
  display: flex;

  ${tablet({
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    padding: "0px 50px",
  })}

  ${largeMobile({
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    padding: "0px 50px",
  })}

  ${mobile({
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    padding: "0px 20px",
  })}
`;

const LeftContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 3;
  position: sticky;
  height: calc(100vh - 80px);
  top: 0px;

  ${desktop({
    flex: "2",
  })};

  ${tablet({
    position: "relative",
    width: "45%",
    aspectRatio: "1 / 1",
  })}

  ${largeMobile({
    position: "relative",
    width: "50%",
    aspectRatio: "1 / 1",
  })}

  ${mobile({
    position: "relative",
    width: "60%",
    aspectRatio: "1 / 1",
  })}
`;

const ImageWrapper = styled.div`
  width: 85%;
  aspect-ratio: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 1);
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Img = styled.img`
  height: 80%;
  width: 80%;
  border-radius: 100%;
  border: 1px solid gray;
  object-fit: cover;
`;

const P = styled.div`
  margin-top: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
`;

const RightContainer = styled.div`
  height: max-content;
  width: 100%;
  flex: 3;
  margin-right: 20px;

  ${desktop({
    margin: "0px 50px 0px 25px",
  })};

  ${tablet({
    marginRight: "0px",
  })}

  ${largeMobile({
    marginRight: "0px",
  })}

  ${mobile({
    marginRight: "0px",
  })}
`;

const Heading = styled.div`
  font-family: "Montserrat", sans-serif;
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
  margin: 30px 0px;
  border: 1px solid black;
  border: 1px solid lightgray;
  padding: 10px;
`;

const HR = styled.hr`
  border-top: 1px solid lightgray;
  width: 95%;
  margin: auto;
`;

const DetailWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const DetailContainer = styled.div`
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.p`
  font-family: "Montserrat", sans-serif;
  padding-left: 4px;
`;

const Input = styled.input`
  outline: ${(props) => (props.enableEdit === true ? "" : "none")};
  border: ${(props) =>
    props.enableEdit === true ? "0.5px solid #d3d3d3" : "none"};
  padding: 5px;
  width: 90%;
  background-color: white;

  ::placeholder {
    font-size: 0.9rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 30px;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  background-color: #4ee2ec;

  :hover {
    background-color: black;
  }
`;

const ReviewContianer = styled.div`
  margin: 30px 0px;
`;

const TripContainer = styled.div`
  margin: 30px 0px;
`;

const ProfileInformation = () => {
  /* Get the Logged-In user from Redux State */
  const user = useSelector((store) => store.user.currentUser);

  /* Information Container Input Field State: */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);

  /* Get required data using Redux State and then populate Input Field state: */
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setProfileImage(user.avatar);
  }, [user.name, user.email, user.avatar]);

  /* re-initialize the user information: */
  const Cancel = () => {
    setName(user.name);
    setEmail(user.email);
    setProfileImage(user.avatar);
    setEnableEdit(false);
  };

  /* upload icon ref: */
  const hiddenFileInput = useRef();
  const [profileImage, setProfileImage] = useState(null);

  /* upload icon ref controller */
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const dispatch = useDispatch();

  /* uploading profile photo: */
  const uploadProfilePhoto = async (file) => {
    /* upload the avatar to the cloudinary: */
    const avatar = await individualUpload(file);

    /* upload the avatar url to the Mongodb Database: */
    const updatedInfo = await axios.post(
      `http://localhost:5000/user/updateInfo/${user._id}`,
      { avatar: avatar.url },
      { withCredentials: true }
    );

    console.log(updatedInfo.data);

    /* update the Global Redux State: */
    dispatch(updateUser(updatedInfo.data));

    /* Display Avatar to user: */
    setProfileImage(avatar.url);
  };

  /* profile photo trigger function */
  const handleAvatarInput = (event) => {
    const fileUploaded = event.target.files[0];
    uploadProfilePhoto(fileUploaded);
  };

  /* update profile information: */
  const update = async () => {
    /* upload the new profile information to the Mongodb Database: */
    const updatedInfo = await axios.post(
      `http://localhost:5000/user/updateInfo/${user._id}`,
      { name: name, email: email },
      { withCredentials: true }
    );

    /* update the Global Redux State: */
    dispatch(updateUser(updatedInfo.data));

    setEnableEdit(false);
  };

  return (
    <>
      <Wrapper>
        <LeftContainer>
          <ImageWrapper>
            <ImageContainer>
              <Img src={profileImage} />
              <P onClick={handleClick}>upload profile photo</P>
              <Input
                type="file"
                ref={hiddenFileInput}
                onChange={handleAvatarInput}
                style={{ display: "none" }}
              />
            </ImageContainer>
          </ImageWrapper>
        </LeftContainer>
        <RightContainer>
          <InformationContainer>
            <Heading>
              Your details:
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
              <DetailContainer>
                <Label>Name:</Label>
                <Input
                  enableEdit={enableEdit}
                  disabled={!enableEdit}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </DetailContainer>

              <DetailContainer>
                <Label>Email:</Label>
                <Input
                  disabled={true}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </DetailContainer>
            </DetailWrapper>

            {enableEdit && (
              <ButtonWrapper>
                <Button onClick={update}>update</Button>
              </ButtonWrapper>
            )}
          </InformationContainer>
          <HR />
          <TripContainer>
            <Heading>Your trips:</Heading>
            <TripCard />
          </TripContainer>
          <HR />
          <ReviewContianer>
            <Heading>Your reviews:</Heading>
            <AuthorHotelReview />
          </ReviewContianer>
        </RightContainer>
      </Wrapper>
      <HR />
    </>
  );
};

export default ProfileInformation;
