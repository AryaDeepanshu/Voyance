import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileAvatar from "../components/ProfileAvatar";
import { mobile, largeMobile } from "../utils/responsive";
import ProfileInfo from "../components/ProfileInfo";

const Wrapper = styled.div`
  display: flex;
  margin: 0% 5%;
  padding: 100px 0px 50px;
  width: calc(100vw - 10%);

  ${largeMobile({
    gap: "20px",
    flexDirection: "column",
  })}

  ${mobile({
    gap: "20px",
    flexDirection: "column",
  })}
`;

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);

  /* Scrolling to top of page whenever page reloads: */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <ProfileAvatar
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />
      <ProfileInfo setProfileImage={setProfileImage} />
    </Wrapper>
  );
};

export default Profile;
