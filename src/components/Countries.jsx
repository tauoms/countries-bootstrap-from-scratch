import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);

  console.log("Countries: ", countries);
  console.log("isLoading: ", isLoading);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  // Handle the loading case here first (use Col, and Spinner)
  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container fluid>
      <Row>
        {countries.map((country) => (
          <Col key={country.name.common} xs={12} sm={6} md={5} lg={3} xl={3}>
            <Container className="text-center p-5">
              <Image src={country.flags.svg} alt="" fluid />
              <strong>{country.name.common}</strong>
              <p>Capital: {country.capital}</p>
            </Container>
          </Col>
        ))}
      </Row>
    </Container>
  );

  // Handle the received data case
};

export default Countries;
