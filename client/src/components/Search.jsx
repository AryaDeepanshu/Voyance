import React, { useState } from "react";
import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { desktop, largeMobile, mobile, tablet } from "../responsive";
import Navbar from "./Navbar";
import NewSearch from "./NewSearch";
import SearchInputSm from "./SearchInputSm";
import SearchInputModal from "./SearchInputModal";
import Modal from "./Modal";

const Container = styled.div`
  width: 100%;
  aspect-ratio: 1.6;
  position: relative;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url(https://res.cloudinary.com/additya/image/upload/v1677858373/Voyance/res9w03fpeen2ti8gei1.jpg); // Desktop

  ${tablet({
    aspectRatio: "1.3",
    backgroundImage:
      "url(https://res.cloudinary.com/additya/image/upload/v1677857909/Voyance/ltl9e3mr5hsxmnpewpam.jpg)", // 768px
  })}

  ${largeMobile({
    aspectRatio: "1.1",
    backgroundImage:
      "url(https://res.cloudinary.com/additya/image/upload/v1677857028/Voyance/qdjsmuzcmsd5e9fzgld6.jpg)", // 660px
  })}

  ${mobile({
    aspectRatio: "0.9",
    backgroundImage:
      "url(https://res.cloudinary.com/additya/image/upload/v1677856888/Voyance/oq013kx6jpifopxsxzph.jpg)", // 480px
  })}

  ${desktop({
    aspectRatio: "2.15",
    backgroundImage:
      "url(https://res.cloudinary.com/additya/image/upload/v1677850468/Voyance/dkcuw15iilwx7j4cvr5p.jpg)", // 1024px onwards
  })}
`;

const Search = () => {
  const { width } = useWindowDimensions();
  const [modal, setModal] = useState(false);

  return (
    <Container>
      {modal && (
        <Modal>
          <SearchInputModal setModal={setModal} />
        </Modal>
      )}

      <Navbar />
      {width > 850 ? (
        <NewSearch />
      ) : (
        !modal && <SearchInputSm setModal={setModal} />
      )}
    </Container>
  );
};

export default Search;
