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
  const [sortField, setSortField] = useState("population");
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeSortButton, setActiveSortButton] = useState("population");
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const favouritesLoading = useSelector(
    (state) => state.favourites.favouritesIsLoading
  );
  const countriesLoading = useSelector((state) => state.countries.isLoading);
  // const searchInput = useSelector((state) => state.countries.search);

  // console.log("favouritesList: ", favouritesList);
  // console.log("countriesList inside favourites: ", countriesList);

  if (Array.isArray(favouritesList) && favouritesList.length > 0) {
    filteredCountries = countriesList.filter((country) =>
      favouritesList.includes(country.name.common)
    );
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
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

  if (countriesLoading || favouritesLoading) {
    return (
      <>
        <Spinner
          animation="border"
          role="status"
          variant="info"
          className="center-spinner"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  }

  // Sorting logic
  const sortedCountries = [...filteredCountries]
    .filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
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
        </Col>
      </Row>
      <Row>
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
            onClick={() => {
              if (
                window.confirm("Are you sure you want to clear all favourites?")
              ) {
                dispatch(clearFavourites());
              }
            }}
          >
            Clear Favourites
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={3} lg={4} xl={5} xxl={5} className="g-3 mt-5">
        {sortedCountries.map((country) => (
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
