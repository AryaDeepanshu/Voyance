import { Close, Edit } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { mobile, largeMobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { individualUpload } from "../utils/fileUpload";
import axios from "axios";
import { updateUser } from "../redux/userSlice";
import default_avatar from "../static/default_avatar.png";
import BASE_URL from "../Base";
const Wrapper = styled.div`
  display: flex;
  padding: 30px 0px;

  ${largeMobile({
    gap: "20px",
    flexDirection: "column",
  })}

  ${mobile({
    gap: "20px",
    flexDirection: "column",
  })}
`;

const LeftContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;

  ${largeMobile({
    justifyContent: "center",
  })}

  ${mobile({
    justifyContent: "center",
  })}
`;

const InformationWrapper = styled.div`
  width: 90%;
  max-width: 500px;
  padding: 20px 0px;
  height: max-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid lightgray;

  ${largeMobile({
    maxWidth: "300px",
  })}

  ${mobile({
    maxWidth: "250px",
  })}
`;

const ImageContainer = styled.div`
  width: 80%;
  aspect-ratio: 1/1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  height: 90%;
  width: 90%;
  border-radius: 100%;
  border: 1px solid gray;
  object-fit: cover;
`;

const ImageOption = styled.button`
  margin-top: 10px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  width: 150px;
  padding: 10px 0px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: ${(props) =>
    props.type === "upload" ? "#4ee2ec" : "black"};

  :hover {
    opacity: 0.5;
    transition: 0.5 all;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const ImageUplaoding = styled.p`
  padding-top: 10px;
  font-family: "Bree Serif", serif;
`;

const RightContainer = styled.div`
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
  background-color: #4ee2ec;

  :hover {
    opacity: 0.5;
    transition: 0.5 all;
  }
`;

const ProfileInformation = () => {
  /* State to Make buttons diabled while Profile photo is uploading. */
  const [uploading, setUploading] = useState(false);

  /* Get the Logged-In user from Redux State */
  const user = useSelector((store) => store.user.currentUser);

  /* Information Container Input Field State: */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);

  /* Get required data using Redux State and then populate Input Field state: */
  useEffect(() => {
    setBio(user.bio === undefined ? "" : user.bio);
    setName(user.name === undefined ? "" : user.name);
    setEmail(user.email === undefined ? "" : user.email);
    setPhone(user.phone === undefined ? "" : user.phone);
    setCountry(user.country === undefined ? "" : user.country);
    setProfileImage(user.avatar);
  }, [user.name, user.email, user.avatar]);

  /* re-initialize the user information: */
  const Cancel = () => {
    setBio(user.bio === undefined ? "" : user.bio);
    setName(user.name === undefined ? "" : user.name);
    setEmail(user.email === undefined ? "" : user.email);
    setPhone(user.phone === undefined ? "" : user.phone);
    setCountry(user.country === undefined ? "" : user.country);
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
    setUploading(true);
    /* upload the avatar to the cloudinary: */
    const avatar = await individualUpload(file);

    /* upload the avatar url to the Mongodb Database: */
    const updatedInfo = await axios.post(
      `http://${BASE_URL}:5000/user/updateInfo/${user._id}`,
      { avatar: avatar.url },
      { withCredentials: true }
    );

    /* update the Global Redux State: */
    dispatch(updateUser(updatedInfo.data));

    /* Display Avatar to user: */
    setProfileImage(avatar.url);
    setUploading(false);
  };

  /* Remove profile photo: */
  const removeProfilePhoto = async (file) => {
    setUploading(true);

    /* upload the avatar url to the Mongodb Database: */
    const updatedInfo = await axios.post(
      `http://${BASE_URL}:5000/user/updateInfo/${user._id}`,
      { avatar: "default_avatar" },
      { withCredentials: true }
    );

    /* update the Global Redux State: */
    dispatch(updateUser(updatedInfo.data));

    /* Display Avatar to user: */
    setProfileImage("default_avatar");
    setUploading(false);
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
      `http://${BASE_URL}:5000/user/updateInfo/${user._id}`,
      { name: name, email: email, country: country, phone: phone, bio: bio },
      { withCredentials: true }
    );

    /* update the Global Redux State: */
    dispatch(updateUser(updatedInfo.data));

    setEnableEdit(false);
  };

  return (
    <Wrapper>
      <LeftContainer>
        <InformationWrapper>
          <ImageContainer>
            <Img
              src={
                profileImage === "default_avatar"
                  ? default_avatar
                  : profileImage
              }
            />
          </ImageContainer>
          <ImageOption onClick={handleClick} type="upload" disabled={uploading}>
            upload
          </ImageOption>
          <ImageOption
            onClick={removeProfilePhoto}
            type="remove"
            disabled={uploading}>
            Remove
          </ImageOption>
          {uploading && (
            <ImageUplaoding>uploading! Please Wait...</ImageUplaoding>
          )}
          <Input
            type="file"
            ref={hiddenFileInput}
            onChange={handleAvatarInput}
            style={{ display: "none" }}
          />
        </InformationWrapper>
      </LeftContainer>

      <RightContainer>
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
                enableEdit={enableEdit}
                disabled={!enableEdit}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </DetailContainer>

            {/* Email */}
            <DetailContainer>
              <Label>Email:</Label>
              <Input
                disabled={true}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </DetailContainer>

            {/* Country: */}
            <DetailContainer>
              <Label>Country:</Label>
              <Input
                enableEdit={enableEdit}
                disabled={!enableEdit}
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
            </DetailContainer>

            {/* Phone Number: */}
            <DetailContainer>
              <Label>Phone No:</Label>
              <Input
                enableEdit={enableEdit}
                disabled={!enableEdit}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                type="number"
              />
            </DetailContainer>

            {/* Bio */}
            <DetailContainer>
              <Label>Bio:</Label>
              <TextInput
                enableEdit={enableEdit}
                disabled={!enableEdit}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </DetailContainer>
          </DetailWrapper>

          {enableEdit && (
            <ButtonWrapper>
              <Button onClick={update}>update</Button>
            </ButtonWrapper>
          )}
        </InformationContainer>
      </RightContainer>
    </Wrapper>
  );
};

export default ProfileInformation;
