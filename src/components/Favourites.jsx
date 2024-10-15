import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { search } from "../store/countriesSlice";
import {
  clearFavourites,
  getFavouritesFromSource,
  removeFavourite,
} from "../store/favouritesSlice";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";

const Favourites = () => {
  const dispatch = useDispatch();
  let countriesList = useSelector((state) => state.countries.countries);
  let filteredCountries = [];
  const [search, setSearch] = useState("");
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector(
    (state) => state.favourites.favouritesIsLoading
  );
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  // const searchInput = useSelector((state) => state.countries.search);

  console.log("favouritesList: ", favouritesList);
  console.log("countriesList inside favourites: ", countriesList);

  if (Array.isArray(favouritesList) && favouritesList.length > 0) {
    filteredCountries = countriesList.filter((country) =>
      favouritesList.includes(country.name.common)
    );
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  if (countriesLoading || favouritesLoading) {
    return (
      <>
        <Spinner
          animation="border"
          role="status"
          variant="info"
          className="center"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  }

  return (
    <Container className="container-lg" style={{ maxWidth: "1300px" }}>
      <Row className="mt-5">
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="search me-2"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
          <Button
            className="button-dark"
            onClick={() => dispatch(clearFavourites())}
          >
            Clear Favourites
          </Button>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} xl={5} xxl={5} className="g-3 mt-5">
        {filteredCountries
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </Row>

      {!filteredCountries.length && (
        <p className="text-center mt-4">
          No favourites found. Try adding some!
        </p>
      )}
    </Container>
  );
};

export default Favourites;
