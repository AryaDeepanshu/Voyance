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

  const checkoutHandler = async (amount, property_name) => {
    const {data:{key}} = await axios.get("http://localhost:4000/payment/getkey")
    const {data:{order}} = await axios.post("http://localhost:4000/payment/pay", {
      amount,
      property_name,
    })
    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Voyance",
      description: data.name,
      image: "https://res.cloudinary.com/additya/image/upload/v1678127598/Voyance/r9udien7vaenzecl8mmk.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:4000/payment/paymentVerification",
      prefill: {
          name: "Deepanshu Arya",
          email: "deepanshu.da85@gmail.com",
          contact: "7206918462"
      },
      notes: {
          address: "Puri duniya apni h"
      },
      theme: {
          color: "#008080"
      }
    };
  const razor  = new window.Razorpay(options);
  razor.open();
  }

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
                      <ReservationCard data={data} setModal={setModal} checkoutHandler={checkoutHandler} />
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
