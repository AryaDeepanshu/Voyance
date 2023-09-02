import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { largeMobile, mobile } from "../../utils/responsive";

const Wrapper = styled.div`
  display: flex;
  margin: 0% 5%;
  align-items: flex-start;
  padding: 20px 0px;

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
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${largeMobile({
    justifyContent: "center",
  })}

  ${mobile({
    justifyContent: "center",
  })}
`;

const InformationWrapper = styled.div`
  width: 90%;
  aspect-ratio: 1/1;
  max-width: 500px;
  height: max-content;
  border: 1px solid lightgray;

  ${largeMobile({
    maxWidth: "300px",
  })}

  ${mobile({
    maxWidth: "250px",
  })}
`;

const ImageContainer = styled.div`
  width: calc(100% - 40px);
  aspect-ratio: 1/1;
  padding: 20px;
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
  gap: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 4px 0px;
`;

const Label = styled.p`
  width: 100px;
`;

const Input = styled.div`
  width: 100%;
`;

const ProfileLoader = () => {
  return (
    <Wrapper>
      <LeftContainer>
        <InformationWrapper>
          <ImageContainer>
            <Skeleton width={"100%"} height={"100%"} />
          </ImageContainer>
        </InformationWrapper>
      </LeftContainer>

      <RightContainer>
        <InformationContainer>
          <Heading>
            <Skeleton height={"40px"} width={"100px"} />
          </Heading>

          <DetailWrapper>
            {Array(5)
              .fill("")
              .map((_, index) => (
                <DetailContainer key={index}>
                  <Label>
                    <Skeleton height={"20px"} />
                  </Label>

                  <Input>
                    <Skeleton height={"20px"} />
                  </Input>
                </DetailContainer>
              ))}
          </DetailWrapper>
        </InformationContainer>
      </RightContainer>
    </Wrapper>
  );
};

export default ProfileLoader;
