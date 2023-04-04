import styled from "styled-components";
import Footer from "../components/Footer";
import Search from "../components/Search";
import OurServices from "../components/OurServices";
import FeaturedProperties from "../components/FeaturedProperties";
import PopularDestinations from "../components/PopularDestinations";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clear } from "../redux/filterAndSearchSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  return (
    <>
      <Search />
      <OurServices />
      <PopularDestinations />
      <FeaturedProperties />
      <Footer />
    </>
  );
}

export default Home;
