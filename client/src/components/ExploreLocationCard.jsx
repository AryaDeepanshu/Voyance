import dayjs from "dayjs";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { search } from "../redux/filterAndSearchSlice";

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  position: relative;
  height: max-content;
`;

const ImgContainer = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 1 / 1;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Header = styled.p`
  margin: 0;
  left: 20px;
  bottom: 20px;
  padding: 5px;
  color: white;
  font-size: 28px;
  font-weight: 500;
  position: absolute;
  font-family: "Inter", sans-serif;
`;

const ExploreLocationCard = ({ info }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const beginDate = dayjs();
  const endDate = dayjs().add(1, "day");

  const exploreLoaction = (location) => {
    dispatch(
      search({
        location: location,
        beginDate: beginDate.format("MM/DD/YYYY"),
        endDate: endDate.format("MM/DD/YYYY"),
        stay: endDate.diff(beginDate, "day"),
        guest: 1,
      })
    );

    navigate(`/search?location=${location}`);
  };
  return (
    <Container onClick={() => exploreLoaction(info?.name)}>
      <ImgContainer>
        <Img alt="location" src={info?.img} />
        <Header>{info?.name}</Header>
      </ImgContainer>
    </Container>
  );
};

export default ExploreLocationCard;
