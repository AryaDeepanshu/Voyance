import dayjs from "dayjs";
import styled from "styled-components";
import Modal from "../components/Modal";
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

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { useLocation, useNavigate } from "react-router-dom";
import {
  datediff,
  decode,
  parseDate,
  today,
  tomorrow,
} from "../utils/dateManipulation";
import { checkout } from "../utils/checkout";

const ExternalWrapper = styled.div`
  padding-top: 80px;
`;

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

  /* Width of window: */
  const { width } = useWindowDimensions();

  /* Get the current user: */
  const user = useSelector((store) => store.user.currentUser);

  /* Getting the hotel-id uisng url parameters: */
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  /* State to manage the index of the image clicked: */
  const [index, setIndex] = useState(0);

  /* State to manage the modal of lightbox: */
  const [lightBox, toggleLightBox] = useState(false);

  /* State to handle the RevervationCard Modal for <= 768px: */
  const [modal, setModal] = useState(false);

  /* Fetching Data using React Query: */
  const { isLoading, data } = useQuery([`${id}`], () =>
    axiosBaseURL.get(`hotel/info/${id}`).then((hotel) => {
      return hotel.data;
    })
  );

  /* State for Date: */
  const [beginDate, setBeginDate] = useState(width <= 768 ? today : dayjs());
  const [endDate, setEndDate] = useState(
    width <= 768 ? tomorrow : dayjs().add(1, "day")
  );

  /* State for Guest Count: */
  const [guest, setGuest] = useState(1);

  /* calculating number of days: */
  const stay =
    typeof beginDate === "string"
      ? datediff(parseDate(beginDate), parseDate(endDate))
      : endDate.diff(beginDate, "day");

  /* State for handling the Login and Register Modal */
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Function that control the Complete Reservation Mechanism: */
  const checkoutHandler = async (amount, property_name) => {
    /* Final Booking Information: */
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
      totalCost: data.cost * stay,
      host: data.hostId._id,
      user: !user ? null : user._id,
    };

    !user
      ? setShowLoginModal(true)
      : checkout(amount, property_name, bookingDetail, navigate, user);
  };

  return (
    <ExternalWrapper>
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
          <HotelInformationLoader />
        </Wrapper>
      ) : (
        <>
          {lightBox ? (
            <LightBox
              hotelImages={data?.images}
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
              ) : null}

              <Wrapper>
                <HotelHeading data={data} />
                <HotelImageSlider
                  thumbnail={data?.images[0]}
                  displayImages={data?.images?.slice(1)}
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

              {width <= 768 && (
                <ReservationStrip setModal={setModal} data={data} stay={stay} />
              )}
            </>
          )}
        </>
      )}
    </ExternalWrapper>
  );
};

export default HotelInformation;
