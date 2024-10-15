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
  const [activeSortButton, setActiveSortButton] = useState("population");

  // console.log("Countries: ", countries);
  // console.log("isLoading: ", isLoading);

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
      setSortOrder("desc");
    }
    setActiveSortButton(field);
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
          ? a.name.common.localeCompare(b.name.common, "fi")
          : b.name.common.localeCompare(a.name.common, "fi");
      }
      return 0;
    });

  return (
    <Container className="container-lg mt-5" style={{ maxWidth: "1300px" }}>
      <Row>
        <Col className="mt-5 d-flex justify-content-center align-items-center">
          {/* Sort Buttons */}
          <div className="sort-by me-2">Sort by: </div>
          <Button
            onClick={() => toggleSortOrder("name")}
            className={
              activeSortButton === "name"
                ? "button-bright me-3"
                : "button-dark me-3"
            }
          >
            Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            onClick={() => toggleSortOrder("population")}
            className={
              activeSortButton === "population"
                ? "button-bright me-3"
                : "button-dark me-3"
            }
          >
            Population{" "}
            {sortField === "population" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            onClick={() => toggleSortOrder("area")}
            className={
              activeSortButton === "area"
                ? "button-bright me-3"
                : "button-dark me-3"
            }
          >
            Area {sortField === "area" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>

          <Form.Control
            style={{ width: "18rem" }}
            type="search"
            className="search me-2 mx-3"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => dispatch(search(e.target.value))}
          ></Form.Control>
        </Col>
      </Row>

      <Row className="mt-3 d-flex justify-content-center"></Row>

      <Row xs={1} md={3} lg={4} xl={5} xxl={5} className="g-3 mt-5">
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
