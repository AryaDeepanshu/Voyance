import styled from "styled-components";
import Footer from "../components/Footer";
import Search from "../components/Search";
import OurServices from "../components/OurServices";
import FeaturedProperties from "../components/FeaturedProperties";
import PopularDestinations from "../components/PopularDestinations";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clear } from "../redux/filterAndSearchSlice";
import Navbar from "../components/Navbar";

const Wrapper = styled.div`
  position: relative;
`;

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clear());
  }, [dispatch]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      {scrollPosition > 80 && (
        <Navbar isHome={true} scrollPosition={scrollPosition} />
      )}
      <Search scrollPosition={scrollPosition} />
      <OurServices />
      <PopularDestinations />
      <FeaturedProperties />
      <Footer home={true} />
    </Wrapper>
  );
}

export default Home;
