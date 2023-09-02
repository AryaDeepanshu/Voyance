import NoResult from "./NoResult";
import HotelCard from "./HotelCard";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { axiosBaseURL } from "../utils/axiosBaseURL";
import { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import SearchHotelListLoader from "./Loaders/SearchHotelListLoader";
import { largeMobile } from "../utils/responsive";

const Container = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  ${largeMobile({
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  })}
`;

const HotelList = ({ modal, category }) => {
  /* Fetching user wishlist using Redux: */
  const { wishlist } = useSelector((store) => store.wishlist);

  /* Search and Filter Info: */
  const searchInfo = useSelector((store) => store.filterAndSearch);
  const { location, minPrice, maxPrice, rating, essentials, mealIncluded } =
    searchInfo;

  /* Logic to Fetch Result based upon Query: */
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [`"${location}"`],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosBaseURL.get(
        `hotel/search?location=${location}&propertyType=${category}&min=${minPrice}&max=${maxPrice}&amenities=${essentials}&mealIncluded=${mealIncluded}&rating=${rating}&pageParam=${pageParam} `
      );

      return response.data;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
  });

  /* Attaching a ref to the last product. */
  const intObserver = useRef();
  const lastProductRef = useCallback(
    (product) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((products) => {
        if (products[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (product) intObserver.current.observe(product);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  /* Accomodation to be displayed to user: */
  const accomodationList = data?.pages?.map((pg) => {
    return pg?.map((info, index) => {
      return index + 1 === pg.length ? (
        <HotelCard
          hotelInfo={info}
          key={info?._id}
          color={wishlist.indexOf(info) !== -1 ? "red" : "white"}
          ref={lastProductRef}
        />
      ) : (
        <HotelCard
          hotelInfo={info}
          key={info?._id}
          color={wishlist.indexOf(info) !== -1 ? "red" : "white"}
        />
      );
    });
  });

  /* re-fetch result on filter or category updation: */
  useEffect(() => {
    refetch();
  }, [category, searchInfo, refetch]);

  return (
    <>
      {isLoading || isRefetching ? (
        <SearchHotelListLoader />
      ) : (
        <>
          {accomodationList[0].length === 0 ? (
            <NoResult />
          ) : (
            <Container>{accomodationList}</Container>
          )}
          {isFetchingNextPage && <SearchHotelListLoader />}
        </>
      )}
    </>
  );
};

export default HotelList;
