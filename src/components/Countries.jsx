import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import {
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { search } from "../store/countriesSlice";
import { LinkContainer } from "react-router-bootstrap";

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
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
        {countries.map((country) => (
          <Col className="mt-5" key={country.name.official}>
            <Card className="h-100">
              <LinkContainer
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
              </LinkContainer>
              <Card.Body classname="d-flex flex-column">
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Subtitle className="mb-5 text-muted">
                  {country.name.official}
                </Card.Subtitle>
                <ListGroup
                  variant="flush"
                  className="flex-grow-1 justify-content-center"
                >
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
