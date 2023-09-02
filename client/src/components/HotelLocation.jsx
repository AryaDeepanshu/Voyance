import styled from "styled-components";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { desktop, mobile } from "../utils/responsive";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${desktop({
    width: "90%",
  })}
`;

const Wrapper = styled.div`
  width: 100%;
  height: max-content;
`;

const Heading = styled.p`
  font-size: 36px;
  font-weight: 500;
  padding: 0px 0px 10px 0px;
  font-family: "Bree Serif", serif;
  ${mobile({
    fontSize: "24px",
  })}
`;

const LocationMapWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1.8;
`;

const LocationMap = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Location = styled.p`
  padding: 30px 0px 0px 0px;
  color: #2a2a2a;
  font-size: 18px;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
`;

const HotelLocation = ({ data }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB2gvJVECkYt6yUc1iDtZVnJ4LpWFqmbNM",
  });

  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+ff0000(${data.long},${data.lat})/${data.long},${data.lat},16,0/1080x720?access_token=pk.eyJ1IjoidGVzdDEwMDAwMSIsImEiOiJjbGhteTRyaHUxZ3htM25xcHBpejloOWk1In0.YlBuIItEABfwbfSweXLFuQ`;

  if (!isLoaded) return <div>Add styles</div>;
  return (
    <Container>
      <Wrapper>
        <Heading>Where you will stay:</Heading>
        <LocationMapWrapper>
          <LocationMap src={url} />
        </LocationMapWrapper>
        <Location>{data.location}</Location>
      </Wrapper>
    </Container>
  );
};

export default HotelLocation;
