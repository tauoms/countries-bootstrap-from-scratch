import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CountrySingle = (props) => {
  const location = useLocation();
  const country = props.country || location.state.country;
  const [weather, setWeather] = useState("");
  const [isWeatherLoading, setisWeatherLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          country.capital
        }&units=metric&appid=${import.meta.env.VITE_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
        setisWeatherLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country.capital]);

  console.log("Weather: ", weather);

  // Handle the loading case first

  if (isWeatherLoading) {
    // Create a spinner
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
    <Container fluid className="mt-5 d-flex justify-content-center">
      <Row>
        <Col className="mt-5 d-flex flex-column align-items-center">
          <Image src={country.flags.svg} style={{ maxHeight: "200px" }} />
          <h2>{country.name.common}</h2>
          <h3>{country.capital}</h3>

          <div>{weather.main.temp.toFixed(1)} °C</div>
          <div>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
          </div>
          <div>{weather.weather[0].description}</div>
          <div>
            <i class="h5 bi bi-wind" />
            {weather.wind.speed.toFixed(1)} m/s
          </div>
          <Button variant="light" onClick={() => navigate("/countries")}>
            Back to countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountrySingle;
