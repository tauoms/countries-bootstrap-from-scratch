import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../services/countriesServices";
import { Col, Container, Spinner } from "react-bootstrap";

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
    <>
      <div>Countries will be here</div>
      {countries.map((country) => (
        <Col className="text-center m-5" key={country.ccn3}>
          <Container>
            <img src={countries.flags.svg} alt="" />
            <strong>{country.name.common}</strong>
            <p>Capital: {country.capital}</p>
          </Container>
        </Col>
      ))}
      <Col className="text-center m-5">
        <Container>
          <strong>{}</strong>
        </Container>
      </Col>
    </>
  );

  // Handle the received data case
};

export default Countries;
