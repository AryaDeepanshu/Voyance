import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import Wrapper from "./components/Wrapper";
import HotelInformationLoader from "./components/Loaders/HotelInformationLoader";
import styled from "styled-components";
import SearchHotelListLoader from "./components/Loaders/SearchHotelListLoader";
import TripCardLoader from "./components/Loaders/TripCardLoader";
import ProfileLoader from "./components/Loaders/ProfileLoader";

const Order = lazy(() => import("./pages/Order"));
const Profile = lazy(() => import("./pages/Profile"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const SearchResult = lazy(() => import("./pages/SearchResult"));
const HotelInformation = lazy(() => import("./pages/HotelInformation"));

const ExternalWrapper = styled.div`
  margin: 0% 5%;
  padding-top: 80px;
  position: relative;
  width: calc(100vw - 10%);
`;

export default function App() {
  const queryClient = new QueryClient();
  const user = useSelector((store) => store.user.currentUser);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Wrapper home="home">
                <Home />
              </Wrapper>
            }
          />

          <Route
            path="/order"
            element={
              !user ? (
                <Wrapper>
                  <Home />
                </Wrapper>
              ) : (
                <Wrapper>
                  <Suspense
                    fallback={
                      <ExternalWrapper>
                        <TripCardLoader />
                      </ExternalWrapper>
                    }>
                    <Order />
                  </Suspense>
                </Wrapper>
              )
            }
          />

          <Route
            path="/profile"
            element={
              !user ? (
                <Wrapper>
                  <Home />
                </Wrapper>
              ) : (
                <Wrapper>
                  <Suspense
                    fallback={
                      <ExternalWrapper>
                        <ProfileLoader />
                      </ExternalWrapper>
                    }>
                    <Profile />
                  </Suspense>
                </Wrapper>
              )
            }
          />

          <Route
            path="/wishlist"
            element={
              !user ? (
                <Wrapper>
                  <Home />
                </Wrapper>
              ) : (
                <Wrapper>
                  <Suspense
                    fallback={
                      <ExternalWrapper>
                        <SearchHotelListLoader />
                      </ExternalWrapper>
                    }>
                    <Wishlist />
                  </Suspense>
                </Wrapper>
              )
            }
          />

          <Route
            path="/search"
            element={
              <Wrapper>
                <Suspense
                  fallback={
                    <ExternalWrapper>
                      <SearchHotelListLoader />
                    </ExternalWrapper>
                  }>
                  <SearchResult />
                </Suspense>
              </Wrapper>
            }
          />

          <Route
            path="/hotel-information/:id"
            element={
              <Wrapper>
                <Suspense
                  fallback={
                    <ExternalWrapper>
                      <HotelInformationLoader />
                    </ExternalWrapper>
                  }>
                  <HotelInformation />
                </Suspense>
              </Wrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// {/* Later Functionalities: */}
// <Route path="/plan" element={<PlanTrip />} />
// <Route path="/add-hotel/" element={!user ? <Home /> : <AddHotel />} />
// <Route
//   path="/edit-hotel/:id"
//   element={!user ? <Home /> : <EditHotel />}
// />
