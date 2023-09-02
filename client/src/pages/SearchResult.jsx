import styled from "styled-components";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import SearchHotelList from "../components/SearchHotelList";

const Wrapper = styled.div`
  width: calc(100vw - 10%);
  margin: 0% 5%;
  padding-top: 80px;
`;

const SearchResult = () => {
  /* State to handle Filter and Search Info: */
  const [modal, setModal] = useState(false);
  const [category, setCategory] = useState("");

  /* Scrolling to top of page whenever page reloads: */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <Filter
        modal={modal}
        setModal={setModal}
        category={category}
        setCategory={setCategory}
      />
      <SearchHotelList modal={modal} category={category} />
    </Wrapper>
  );
};

export default SearchResult;
