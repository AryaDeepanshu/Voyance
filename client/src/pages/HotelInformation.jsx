import dayjs from "dayjs";
import styled from "styled-components";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import LightBox from "../components/LightBox";
import HotelReview from "../components/HotelReview";
import HotelHeading from "../components/HotelHeading";
import HotelDetails from "../components/HotelDetails";
import ReservationCard from "../components/ReservationCard";
import HotelImageSlider from "../components/HotelImageSlider";
import ReservationStrip from "../components/RevervationStrip";
import useWindowDimensions from "../hooks/useWindowDimensions";
import HotelInformationLoader from "../components/Loaders/HotelInformationLoader";

import axios from "axios";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: calc(100vw - 10%);
  margin: 0% 5%;
  position: relative;
`;

const BottomContainer = styled.div`
  gap: 25px;
  display: flex;
  position: relative;
`;

const HotelInformation = () => {
  const navigate = useNavigate();

  /* Get the current user: */
  const user = useSelector((store) => store.user.currentUser);

  /* Width of window: */
  const { width } = useWindowDimensions();

  /* Date Mechanism: */
  const filterAndSearch = useSelector((store) => store.filterAndSearch);

  // today's Date:
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const today = date.getFullYear() + "-" + month + "-" + day;

  // tomorrow's Date:
  var nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 1);
  const tomorrowDay = String(nextDate.getDate()).padStart(2, "0");
  const tomorrowMonth = String(nextDate.getMonth() + 1).padStart(2, "0");
  const tomorrow =
    nextDate.getFullYear() + "-" + tomorrowMonth + "-" + tomorrowDay;

  const [beginDate, setBeginDate] = useState(width <= 768 ? today : dayjs());
  const [endDate, setEndDate] = useState(
    width <= 768 ? tomorrow : dayjs().add(1, "day")
  );

  /* Calculate difference b/w date in case of "string" format: */
  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  function parseDate(str) {
    var ydm = str.split("-");
    return new Date(Number(ydm[0]), Number(ydm[1]) - 1, Number(ydm[2])); // year month day
  }

  /* State for Guest Count: */
  const [guest, setGuest] = useState(1);

  /* Mechanism to handle out the final Order: */

  // calculating number of days:
  const stay =
    typeof beginDate === "string"
      ? datediff(parseDate(beginDate), parseDate(endDate))
      : endDate.diff(beginDate, "day");

  const decode = (date) => {
    const ymd = date.split("-");
    return `${ymd[1]}/${ymd[2]}/${ymd[0]} `;
  };

  /* Getting the hotel-id uisng url parameters: */
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  /* Fetching Data using React Query: */
  const { isLoading, error, data } = useQuery([`${id}`], () =>
    axiosBaseURL.get(`hotel/info/${id}`).then((hotel) => {
      return hotel.data;
    })
  );

  /* State to manage the index of the image clicked: */
  const [index, setIndex] = useState(0);

  /* State to manage the modal of lightbox: */
  const [lightBox, toggleLightBox] = useState(false);

  /* State to handle the RevervationCard Modal for <= 768px: */
  const [modal, setModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* State for handling the Login and Register Modal */
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // final-booking-detail:
  const bookingDetail = {
    beginDate:
      typeof beginDate === "string"
        ? decode(beginDate)
        : beginDate.format("MM/DD/YYYY"),
    endDate:
      typeof endDate === "string"
        ? decode(endDate)
        : endDate.format("MM/DD/YYYY"),
    guest: guest,
    hotel: id,
    totalCost: isLoading ? 0 : data.cost * stay,
    host: isLoading ? "" : data.hostId._id,
    user: !user ? "" : user._id,
  };

  /* Function that control the Complete Reservation Mechanism: */
  const checkoutHandler = async (amount, property_name) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const {
      data: { key },
    } = await axiosBaseURL.get("payment/getkey");

    const {
      data: { order },
    } = await axiosBaseURL.post("payment/pay", {
      amount,
      property_name,
    });

    const options = {
      key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Voyance",
      description: data.name,
      image:
        "https://res.cloudinary.com/additya/image/upload/v1678127598/Voyance/r9udien7vaenzecl8mmk.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        await axios.post(
          "http://localhost:5000/order",
          {
            ...bookingDetail,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
          },
          {
            withCredentials: true,
          }
        );

        navigate("/order");
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      notes: {
        address: "Puri duniya apni h",
      },
      theme: {
        color: "#008080",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <>
      {showLoginModal && (
        <Modal>
          <SignIn
            setShowLoginModal={setShowLoginModal}
            setShowRegisterModal={setShowRegisterModal}
          />
        </Modal>
      )}

      {showRegisterModal && (
        <Modal>
          <SignUp
            setShowLoginModal={setShowLoginModal}
            setShowRegisterModal={setShowRegisterModal}
          />
        </Modal>
      )}

      {isLoading ? (
        <Wrapper>
          <Navbar scrollPosition={80} />
          <HotelInformationLoader />
          <Footer />
        </Wrapper>
      ) : (
        <>
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
                <Modal>
                  <ReservationCard
                    data={data}
                    setModal={setModal}
                    beginDate={beginDate}
                    setBeginDate={setBeginDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    stay={stay}
                    guest={guest}
                    setGuest={setGuest}
                    checkoutHandler={checkoutHandler}
                  />
                </Modal>
              ) : (
                <></>
              )}

              <Wrapper>
                <Navbar scrollPosition={80} />
                <HotelHeading data={data} />
                <HotelImageSlider
                  thumbnail={data.images[0]}
                  displayImages={data.images.slice(1)}
                  setIndex={setIndex}
                  toggleLightBox={toggleLightBox}
                />
                <BottomContainer>
                  <HotelDetails data={data} />
                  {width > 768 && (
                    <ReservationCard
                      data={data}
                      setModal={setModal}
                      beginDate={beginDate}
                      setBeginDate={setBeginDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      stay={stay}
                      guest={guest}
                      setGuest={setGuest}
                      checkoutHandler={checkoutHandler}
                    />
                  )}
                </BottomContainer>
                <HotelReview />
              </Wrapper>

              <Footer />
              {width <= 768 && (
                <ReservationStrip setModal={setModal} data={data} stay={stay} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default HotelInformation;
