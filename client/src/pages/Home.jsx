import styled from "styled-components";
import Footer from "../components/Footer";
import Search from "../components/Search";
import OurServices from "../components/OurServices";
import FeaturedProperties from "../components/FeaturedProperties";
import PopularDestinations from "../components/PopularDestinations";

const Wrapper = styled.div`
  position: relative;
  /* overflow: hidden; */
`;

function Home() {
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
