import { useEffect } from "react";
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
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const favourites = useSelector((state) => state.favourites.favourites);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);

  console.log("Countries: ", countries);
  console.log("isLoading: ", isLoading);

  // useEffect(() => {
  //   const exampleMapTest = () => {
  //     console.time("exampleMapTest start:");
  //     countries.map((country) => {
  //       console.log(country.name.common);
  //     });
  //     console.timeEnd("exampleMapTest end:");
  //   };
  //   exampleMapTest();
  // }, [dispatch]);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  // Handle the loading case here first (use Col, and Spinner)
  if (isLoading) {
    return (
      <Spinner
        animation="border"
        role="status"
        variant="info"
        className="center"
      />
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form.Control
            style={{ width: "18rem" }}
            type="search"
            className="me-2"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => dispatch(search(e.target.value))}
          ></Form.Control>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} xl={5} xxl={6} className="g-3">
        {countries
          .filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          )
          .map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
      </Row>
    </Container>
  );

  // Handle the received data case
};

export default Countries;

{
  /* {countries.map((country) => (
          <Col
          className="mt-5 d-flex justify-content-center"
          key={country.name.common}
          xs={12}
          sm={6}
          md={5}
          lg={3}
          xl={2}
        >
            <Container className="text-center p-4">
              <Image src={country.flags.svg} alt="" fluid />
              <strong>{country.name.common}</strong>
              <p>Capital: {country.capital}</p>
            </Container>
          ))} 
           </Col>*/
}
