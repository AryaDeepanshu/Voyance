import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CostAndSpaces from "./CostAndSpaces";
import MealType from "./MealType";
import AmenityType from "./AmenityType";
import PropertyType from "./PropertyType";
import Location from "./Location";
import fileUpload from "../utils/fileUpload";
import axios from "axios";
import { Upload } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosBaseURL } from "../utils/axiosBaseURL";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 80%;
  max-width: ${(props) => (props.edit ? "768px" : "")};
`;

const SectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 22px;
  margin: 15px 0px;
  font-family: "Bree Serif", serif;
`;

const Label = styled.div`
  color: gray;
  font-size: 16px;
  margin-top: 5px;
  font-family: "Roboto", sans-serif;
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  margin: 5px 0px 10px 0px;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  border-bottom: 1px solid lightgray;
`;

const InputArea = styled.textarea`
  outline: none;
  border: none;
  width: 100%;
  margin: 5px 0px 10px 0px;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  border-bottom: 1px solid lightgray;
`;

const Hr = styled.hr`
  margin: 20px 0px;
  width: 100%;
  border: none;
  border-bottom: 1px solid lightgray;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: 30px 0px;
  align-items: center;
  justify-content: flex-start;
`;

const Button = styled.button`
  font-size: 16px;
  cursor: pointer;
  padding: 15px 30px;
  background-color: #ff0b55;
  font-family: "Roboto", sans-serif;
  color: white;
  border: none;
`;

const FileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  width: 125px;
  height: 125px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const File = styled.input``;

const ErrorMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
  font-family: "Josefin Sans", sans-serif;
`;

const ProgressMessage = styled.p`
  width: 100%;
  color: green;
  font-size: 18px;
  font-family: "Josefin Sans", sans-serif;
`;

const HotelForm = () => {
  /* State for taking input from user: */
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");

  const [mealTypeList, setMealTypeList] = useState([]);
  const [amentiyTypeList, setAmentiyTypeList] = useState([]);
  const [propertyTypeList, setPropertyTypeList] = useState([]);

  const [price, setPrice] = useState(0);
  const [guest, setGuest] = useState(1);
  const [bedrooms, setBedrooms] = useState(1);
  const [beds, setBeds] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const [file, setFile] = useState({});

  /* State for Handling form Error: */
  const [nameError, setNameError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const [mealTypeListError, setMealTypeListError] = useState(false);
  const [amentiyTypeListError, setAmentiyTypeListError] = useState(false);
  const [propertyTypeListError, setPropertyTypeListError] = useState(false);

  const [priceError, setPriceError] = useState(false);
  const [fileError, setFileError] = useState(false);

  // -> will be used in Edit route -> to store links from cloudinary.
  const [uploadedImages, setUploadedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // ref for input icon:
  const hiddenFileInput = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  // use the useLocation to know if we are in edit route or not, consider a edit variable and get the hotelId as well:
  const route = useLocation();
  const edit = route.pathname.split("/")[1] === "edit-hotel";
  const hotelId = route.pathname.split("/")[2];

  // if we are in edit hotel route -> then firstly we will fetch the hotel related data from the db and display it to the host:
  useEffect(() => {
    // if we are in the edit hotel route -> prefetch the required data from the db.
    if (edit) {
      const getHotel = async () => {
        const hotel = await axiosBaseURL.get(
          `http://localhost:5000/host/getHotel/${hotelId}`
        );

        console.log(hotelId);
        console.log(hotel);

        const location = hotel.data.location.split(", ");
        setName(hotel.data.name);
        setCity(location[0]);
        setState(location[1]);
        setCountry(location[2]);
        setDescription(hotel.data.about);

        setMealTypeList(hotel.data.mealIncluded);
        setPropertyTypeList(hotel.data.propertyType);
        setAmentiyTypeList(hotel.data.amenities);

        setPrice(hotel.data.cost);
        setGuest(hotel.data.guest);
        setBedrooms(hotel.data.bedrooms);
        setBeds(hotel.data.beds);
        setBathrooms(hotel.data.bathrooms);

        setLat(hotel.data.lat);
        setLong(hotel.data.long);

        setExistingImages(hotel.data.images);
      };

      getHotel();
    }
  }, [edit, hotelId]);

  /* Form Validation Check: */
  const validate = () => {
    let validated = true;
    /* Perform Form Validations: */
    if (name === "") {
      setNameError(true);
      validated = false;
    }

    if (city === "") {
      setCityError(true);
      validated = false;
    }

    if (price === 0) {
      setPriceError(true);
      validated = false;
    }

    if (state === "") {
      setStateError(true);
      validated = false;
    }

    if (uploadedImages.length === undefined || uploadedImages.length < 5) {
      if (edit) {
        if (uploadedImages.length < 5) {
          setFileError(true);
          validated = false;
        }
      } else {
        setFileError(true);
        validated = false;
      }
    }

    if (country === "") {
      setCountryError(true);
      validated = false;
    }

    if (description === "") {
      setDescriptionError(true);
      validated = false;
    }

    if (mealTypeList.length === 0) {
      setMealTypeListError(true);
      validated = false;
    }

    if (amentiyTypeList.length === 0) {
      setAmentiyTypeListError(true);
      validated = false;
    }

    if (propertyTypeList.length === 0) {
      setPropertyTypeListError(true);
      validated = false;
    }

    return validated === true ? true : false;
  };

  const user = useSelector((store) => store.user.currentUser);
  const navigate = useNavigate();

  /* State to handle uploading Error: */
  const [uploadInProgress, setUploadInProgress] = useState(false);

  /* upload images to Cloudinary: */
  const ImageUpload = async (event) => {
    setFileError(false);
    setUploadInProgress(true);
    const urls = await fileUpload(event.target.files);
    setUploadedImages(urls);
    setUploadInProgress(false);

    console.log(urls);
    console.log(uploadedImages);
  };

  // Final Function to be called: -> working fine
  const createOrUpdateHotel = async () => {
    if (!validate()) return;

    // setUploadInProgress(true);

    /* upload images to Cloudinary: */
    // const urls = await fileUpload(file);

    /* upload data in the db: */
    const data = {
      name: name,
      location: `${city}, ${state}, ${country}`,
      cost: price,
      about: description,
      images: uploadedImages.length === 0 ? existingImages : uploadedImages,
      guest: guest,
      beds: beds,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      amenities: amentiyTypeList,
      propertyType: propertyTypeList,
      mealIncluded: mealTypeList,
      hostId: user._id,
      lat: lat,
      long: long,
    };

    // setUploadInProgress(false);

    if (edit) {
      const hotel_updated = await axiosBaseURL.post(
        `http://localhost:5000/host/updateHotel/${hotelId}`,
        data,
        { withCredentials: true }
      );

      navigate(`/hotel-information/${hotel_updated.data._id}`);
    } else {
      const hotel_created = await axiosBaseURL.post(
        "http://localhost:5000/host/addHotel",
        data,
        { withCredentials: true }
      );

      navigate(`/hotel-information/${hotel_created.data._id}`);
    }
  };

  return (
    <Wrapper>
      <Container edit={edit}>
        {/* Listing Basic Infromation: */}
        <SectionHeading>Listing Basic</SectionHeading>

        {/* title: */}
        <Label>title:</Label>
        {nameError && (
          <ErrorMessageWrapper>
            <ErrorMessage>*required</ErrorMessage>
          </ErrorMessageWrapper>
        )}
        <Input
          value={name}
          onChange={(event) => {
            setNameError(false);
            setName(event.target.value);
          }}
          required={true}
        />

        {/* city: */}
        <Label>city:</Label>
        {cityError && (
          <ErrorMessageWrapper>
            <ErrorMessage>*required</ErrorMessage>
          </ErrorMessageWrapper>
        )}
        <Input
          value={city}
          onChange={(event) => {
            setCityError(false);
            setCity(event.target.value);
          }}
          required
        />

        {/* state: */}
        <Label>state:</Label>
        {stateError && (
          <ErrorMessageWrapper>
            <ErrorMessage>*required</ErrorMessage>
          </ErrorMessageWrapper>
        )}
        <Input
          value={state}
          onChange={(event) => {
            setStateError(false);
            setState(event.target.value);
          }}
          required
        />

        {/* country */}
        <Label>country:</Label>
        {countryError && (
          <ErrorMessageWrapper>
            <ErrorMessage>*required</ErrorMessage>
          </ErrorMessageWrapper>
        )}
        <Input
          value={country}
          onChange={(event) => {
            setCountryError(false);
            setCountry(event.target.value);
          }}
          required
        />

        {/* description: */}
        <Label>description:</Label>
        {descriptionError && (
          <ErrorMessageWrapper>
            <ErrorMessage>*required</ErrorMessage>
          </ErrorMessageWrapper>
        )}
        <InputArea
          value={description}
          onChange={(event) => {
            setDescriptionError(false);
            setDescription(event.target.value);
          }}
          required
        />

        {/* Cost & Spaces: */}
        <SectionHeading>cost & spaces</SectionHeading>
        <CostAndSpaces
          price={price}
          setPrice={setPrice}
          guest={guest}
          setGuest={setGuest}
          bedrooms={bedrooms}
          setBedrooms={setBedrooms}
          beds={beds}
          setBeds={setBeds}
          bathrooms={bathrooms}
          setBathrooms={setBathrooms}
          priceError={priceError}
          setPriceError={setPriceError}
        />

        <Hr />

        <SectionHeading>Location </SectionHeading>
        <Location lat={lat} setLat={setLat} long={long} setLong={setLong} />

        <Hr />

        {/* Property Type: */}
        <SectionHeading>
          property type
          {propertyTypeListError && (
            <ErrorMessageWrapper>
              <ErrorMessage>*required</ErrorMessage>
            </ErrorMessageWrapper>
          )}
        </SectionHeading>
        <PropertyType
          propertyTypeList={propertyTypeList}
          setPropertyTypeList={setPropertyTypeList}
          setPropertyTypeListError={setPropertyTypeListError}
        />

        <Hr />

        {/* Amenities Provided: */}
        <SectionHeading>
          amenities
          {amentiyTypeListError && (
            <ErrorMessageWrapper>
              <ErrorMessage>*required</ErrorMessage>
            </ErrorMessageWrapper>
          )}
        </SectionHeading>
        <AmenityType
          amentiyTypeList={amentiyTypeList}
          setAmentiyTypeList={setAmentiyTypeList}
          setAmentiyTypeListError={setAmentiyTypeListError}
        />

        <Hr />

        {/* Meal Included: */}
        <SectionHeading>
          meal included
          {mealTypeListError && (
            <ErrorMessageWrapper>
              <ErrorMessage>*required</ErrorMessage>
            </ErrorMessageWrapper>
          )}
        </SectionHeading>
        <MealType
          mealTypeList={mealTypeList}
          setMealTypeList={setMealTypeList}
          setMealTypeListError={setMealTypeListError}
        />

        <Hr />

        {/* Photo's */}
        <SectionHeading>
          upload photo's
          {fileError && (
            <ErrorMessageWrapper>
              <ErrorMessage>*upload minimum 5 photo's</ErrorMessage>
            </ErrorMessageWrapper>
          )}
        </SectionHeading>

        {/* Component having the existing hotel images -> used in the edit component */}
        <ImageContainer>
          {existingImages.map((img, index) => (
            <ImageWrapper key={index}>
              <Image src={img} />
            </ImageWrapper>
          ))}
        </ImageContainer>

        <FileWrapper>
          <ImageContainer>
            {uploadedImages.map((upload, index) => (
              <ImageWrapper key={index}>
                <Image src={upload} />
              </ImageWrapper>
            ))}
          </ImageContainer>

          {uploadInProgress && (
            <ProgressMessage> uploading images, please wait! </ProgressMessage>
          )}

          <Upload
            style={{
              transform: "scale(1.5)",
              paddingRight: "20px",
              cursor: "pointer",
            }}
            onClick={handleClick}
          />

          <File
            type="file"
            multiple
            ref={hiddenFileInput}
            style={{ display: "none" }}
            disabled={uploadInProgress}
            onChange={(event) => ImageUpload(event)}
          />
        </FileWrapper>

        {/* Button */}
        <ButtonWrapper>
          <Button onClick={createOrUpdateHotel}>
            {edit ? "update" : "submit"}
          </Button>
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

export default HotelForm;
