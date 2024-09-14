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

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const favourites = useSelector((state) => state.favourites.favourites);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);

  console.log("Countries: ", countries);
  console.log("isLoading: ", isLoading);

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
      <Row xs={2} md={3} lg={4} className="g-3">
        {countries
          .filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          )
          .map((country) => (
            <Col className="mt-5" key={country.name.official}>
              <Card className="h-100 d-flex flex-column">
                <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                >
                  <Card.Img
                    variant="top"
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="rounded h-50"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>
                      {favourites.includes(country.name.common) && (
                        <i
                          className="h5 bi bi-star-fill me-2"
                          style={{ color: "gold" }}
                        />
                      )}
                      {country.name.common}
                    </Card.Title>
                    <Card.Subtitle className="mb-5 text-muted">
                      {country.name.official}
                    </Card.Subtitle>
                  </div>
                  <ListGroup variant="flush" className="flex-grow-1">
                    <ListGroup.Item>
                      <i className="h5 bi bi-people me-2" />
                      {country.population.toLocaleString()}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="h5 bi bi-cash-coin me-2" />
                      {Object.values(country.currencies || {})
                        .map(
                          (currency) => `${currency.name} (${currency.symbol})`
                        )
                        .join(", ") || "No currency"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="h5 bi bi-chat-dots me-2" />
                      {Object.values(country.languages || {})
                        .map((language) => language)
                        .join(", ") || "No official language"}
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="mt-3">
                    {!favourites.includes(country.name.common) && (
                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={() =>
                          dispatch(addFavourite(country.name.common))
                        }
                      >
                        Add Favourite
                      </Button>
                    )}
                    {favourites.includes(country.name.common) && (
                      <Button
                        variant="warning"
                        className="w-100"
                        onClick={() =>
                          dispatch(removeFavourite(country.name.common))
                        }
                      >
                        Remove Favourite
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
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
