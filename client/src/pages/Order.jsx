import { useEffect } from "react";
import styled from "styled-components";
import Empty from "../components/Empty";
import TripCard from "../components/TripCard";
import TripCardLoader from "../components/Loaders/TripCardLoader";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { largeMobile, mobile } from "../utils/responsive";

const Wrapper = styled.div`
  margin: 0% 5%;
  padding-top: 80px;
  position: relative;
  width: calc(100vw - 10%);
`;

const Heading = styled.div`
  font-size: 48px;
  margin-left: 10px;
  font-family: "Bree Serif", serif;

  ${mobile({
    fontSize: "32px",
    margin: "1% 0% 0% 6%",
  })}

  ${largeMobile({
    fontSize: "36px",
    margin: "1% 0% 0% 5%",
  })}
`;

const Order = () => {
  /* Get the current user from the redux store: */
  const user = useSelector((store) => store.user.currentUser);

  /* Scrolling to top of page whenever page reloads: */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoading, data } = useQuery([`Order_${user._id}`], () =>
    axiosBaseURL
      .get(`order/${user._id}`, {
        withCredentials: true,
      })
      .then((order) => {
        return order.data;
      })
  );

  return (
    <Wrapper>
      <Heading>Your Orders:</Heading>
      {isLoading ? (
        <TripCardLoader />
      ) : data.length === 0 ? (
        <Empty wishlist={false} />
      ) : (
        <TripCard tripData={data} />
      )}
    </Wrapper>
  );
};

export default Order;
