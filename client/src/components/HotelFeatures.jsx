import { ChairAlt, EventNote, LocationOn } from "@mui/icons-material";
import dayjs from "dayjs";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const FeatureContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FeatureDetail = styled.div``;

const FeatureHeading = styled.p`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 5px;
  font-family: "Bree Serif", serif;
`;

const FeatureContent = styled.p`
  color: #979797;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
`;

const HotelFeatures = () => {
  return (
    <Container>
      <FeatureContainer>
        <ChairAlt
          style={{
            transform: "scale(1.2)",
            marginRight: "15px",
          }}
        />
        <FeatureDetail>
          <FeatureHeading>Dedicated Workspace</FeatureHeading>
          <FeatureContent>
            A common area with wifi that's well suited for working.
          </FeatureContent>
        </FeatureDetail>
      </FeatureContainer>

      <FeatureContainer>
        <LocationOn
          style={{
            transform: "scale(1.2)",
            marginRight: "15px",
          }}
        />
        <FeatureDetail>
          <FeatureHeading>Great Location</FeatureHeading>
          <FeatureContent>
            90% of recent guests gave the location 5-star rating.
          </FeatureContent>
        </FeatureDetail>
      </FeatureContainer>

      <FeatureContainer>
        <EventNote
          style={{
            transform: "scale(1.2)",
            marginRight: "15px",
          }}
        />
        <FeatureDetail>
          <FeatureHeading>
            Free cancellation before {dayjs().add(7, "day").format("DD MMM")}
          </FeatureHeading>
        </FeatureDetail>
      </FeatureContainer>
    </Container>
  );
};

export default HotelFeatures;
