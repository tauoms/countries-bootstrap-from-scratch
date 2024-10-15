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
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { Link } from "react-router-dom";
import CountryCard from "./CountryCard";

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);

  const [sortField, setSortField] = useState("population");
  const [sortOrder, setSortOrder] = useState("desc");

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

  // Toggle sorting field and order
  const toggleSortOrder = (field) => {
    if (sortField === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

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

  // Sorting logic
  const sortedCountries = [...countries]
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "population") {
        return sortOrder === "asc"
          ? a.population - b.population
          : b.population - a.population;
      } else if (sortField === "area") {
        return sortOrder === "asc" ? a.area - b.area : b.area - a.area;
      } else if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      }
      return 0;
    });

  return (
    <Container className="container-lg" style={{ maxWidth: "1300px" }}>
      <Row className="mt-5">
        <Col className="mt-5 d-flex justify-content-center">
          <Form.Control
            style={{ width: "18rem" }}
            type="search"
            className="search me-2"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => dispatch(search(e.target.value))}
          ></Form.Control>
        </Col>
      </Row>

      {/* Sort Buttons */}
      <Row className="mt-3 d-flex justify-content-center">
        <Col className="d-flex justify-content-center">
          <Button
            variant="primary"
            onClick={() => toggleSortOrder("name")}
            className="me-3"
          >
            Sort by Name{" "}
            {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant="secondary"
            onClick={() => toggleSortOrder("population")}
            className="me-3"
          >
            Sort by Population{" "}
            {sortField === "population" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button variant="secondary" onClick={() => toggleSortOrder("area")}>
            Sort by Area{" "}
            {sortField === "area" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
        </Col>
      </Row>

      <Row xs={2} md={3} lg={4} xl={5} xxl={5} className="g-3 mt-5">
        {sortedCountries
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
