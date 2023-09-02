import React, { useRef, useState } from "react";
import default_avatar from "../static/default_avatar.png";
import styled from "styled-components";
import { largeMobile, mobile } from "../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { individualUpload } from "../utils/fileUpload";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { updateUser } from "../redux/userSlice";

const Container = styled.div`
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
    props.type === "upload" ? "#0ead69" : "black"};

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

const ProfileAvatar = ({ profileImage, setProfileImage }) => {
  /* Get the Logged-In user from Redux State */
  const user = useSelector((store) => store.user.currentUser);

  /* upload icon ref: */
  const hiddenFileInput = useRef();

  /* upload icon ref controller */
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const dispatch = useDispatch();
  /* State to Make buttons diabled while Profile photo is uploading. */
  const [uploading, setUploading] = useState(false);

  /* uploading profile photo: */
  const uploadProfilePhoto = async (file) => {
    setUploading(true);
    /* upload the avatar to the cloudinary: */
    const avatar = await individualUpload(file);

    /* upload the avatar url to the Mongodb Database: */
    const updatedInfo = await axiosBaseURL.post(
      `user/updateInfo/${user._id}`,
      { avatar: avatar.url },
      { withCredentials: true }
    );

    /* Display Avatar to user: */
    setProfileImage(avatar.url);

    /* update the Global Redux State: */
    dispatch(updateUser(updatedInfo.data));

    setUploading(false);
  };

  /* Remove profile photo: */
  const removeProfilePhoto = async () => {
    setUploading(true);

    /* upload the avatar url to the Mongodb Database: */
    const updatedInfo = await axiosBaseURL.post(
      `user/updateInfo/${user._id}`,
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
  return (
    <Container>
      <InformationWrapper>
        <ImageContainer>
          <Img
            src={
              profileImage === "default_avatar" ? default_avatar : profileImage
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
    </Container>
  );
};

export default ProfileAvatar;
