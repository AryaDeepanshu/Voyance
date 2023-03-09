import styled from "styled-components";
import Footer from "../components/Footer";
import Search from "../components/Search";
import OurServices from "../components/OurServices";
import FeaturedProperties from "../components/FeaturedProperties";
import PopularDestinations from "../components/PopularDestinations";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clear } from "../redux/filterAndSearchSlice";

const Wrapper = styled.div`
  position: relative;
`;

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  return (
    <Wrapper>
      <Search />
      <OurServices />
      <PopularDestinations />
      <FeaturedProperties />
      <Footer />
    </Wrapper>
  );
}

export default Home;
