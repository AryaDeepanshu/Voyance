import { useState } from "react";
import styled from "styled-components";
import HotelDetails from "../components/HotelDetails";
import HotelImageSlider from "../components/HotelImageSlider";
import ReservationCard from "../components/ReservationCard";
import LightBox from "../components/LightBox";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HotelHeading from "../components/HotelHeading";
import ReservationModal from "../components/ReservationModal";
import ReservationStrip from "../components/RevervationStrip";
import useWindowDimensions from "../hooks/useWindowDimensions";
import HotelReview from "../components/HotelReview";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Container = styled.div`
  width: calc(100vw - 10%);
  padding: 0% 5%;
  position: relative;
`;

const BottomContainer = styled.div`
  display: flex;
  position: relative;
`;

const HotelInformation = () => {
  /* Getting the hotel-id uisng url parameters: */
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  /* Fetching Data using React Query: */
  const { isLoading, error, data } = useQuery([`${id}`], () =>
    axios.get(`http://localhost:5000/hotel/info/${id}`).then((hotel) => {
      return hotel.data;
    })
  );

  /* State to manage the index of the image clicked: */
  const [index, setIndex] = useState(0);

  /* State to manage the modal of lightbox: */
  const [lightBox, toggleLightBox] = useState(false);

  /* State to handle the RevervationCard Modal for <= 768px: */
  const [modal, setModal] = useState(false);

  /* Width of window: */
  const { width } = useWindowDimensions();

  return (
    <>
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <> Something went wrong </>
      ) : (
        <>
          {!lightBox && !modal && <Navbar />}
          {lightBox ? (
            <LightBox
              hotelImages={data.images}
              index={index}
              setIndex={setIndex}
              toggleLightBox={toggleLightBox}
            />
          ) : (
            <>
              {modal ? (
                <ReservationModal data={data} setModal={setModal} />
              ) : (
                <Container>
                  <HotelHeading data={data} />
                  <HotelImageSlider
                    thumbnail={data.images[0]}
                    displayImages={data.images.slice(1)}
                    setIndex={setIndex}
                    toggleLightBox={toggleLightBox}
                  />
                  <BottomContainer>
                    <HotelDetails data={data} />
                    {width > 768 ? (
                      <ReservationCard data={data} setModal={setModal} />
                    ) : (
                      <></>
                    )}
                  </BottomContainer>
                  <HotelReview />
                </Container>
              )}
              {!lightBox && !modal && <Footer type="hotelInfo" />}
              {width <= 768 ? <ReservationStrip setModal={setModal} /> : <></>}
            </>
          )}
        </>
      )}
    </>
  );
};

export default HotelInformation;
