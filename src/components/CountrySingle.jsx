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
        }&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
        setisWeatherLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country.capital]);

  // console.log("Weather: ", weather);

  // Handle the loading case first

  if (isWeatherLoading) {
    // Create a spinner
    return (
      <Spinner
        animation="border"
        role="status"
        variant="info"
        className="center-spinner"
      />
    );
  }

  return (
    <Container fluid className="mt-5 d-flex justify-content-center">
      <Row className="country-info p-4 rounded shadow-sm">
        <Col className="mt-5 d-flex flex-column align-items-center">
          <Image
            src={country.flags.svg}
            style={{ maxHeight: "200px" }}
            className="mb-4 rounded"
          />
          <h2 className="text-center">{country.name.common}</h2>
          <h3 className="subtitle">{country.capital}</h3>

          <div className="mb-3">
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>

          {/* Weather Data */}
          <div className="mb-3">
            <strong>Condition:</strong> {weather.weather[0].description}
          </div>
          <div className="mb-3">
            <i className="h5 bi bi-thermometer-half me-2" />
            <strong>Temperature:</strong> {weather.main.temp.toFixed(1)} °C
          </div>
          <div className="mb-3">
            <i className="h5 bi bi-wind me-2" />
            <strong>Wind Speed:</strong> {weather.wind.speed.toFixed(1)} m/s
          </div>

          {/* Additional Country Information */}
          <div className="border-top w-100 mt-4 pt-3">
            <h5 className="text-center mb-4">Country Info:</h5>
            <div className="mb-2">
              <strong>Population:</strong> {country.population.toLocaleString()}
            </div>
            <div className="mb-2">
              <strong>Area:</strong> {country.area.toLocaleString()} km²
            </div>
            <div className="mb-2">
              <strong>Region:</strong> {country.region}
            </div>
            <div className="mb-2">
              <strong>Subregion:</strong> {country.subregion}
            </div>
            <div className="mb-2">
              <strong>Languages:</strong>{" "}
              {Object.values(country.languages || {}).join(", ")}
            </div>
            <div className="mb-2">
              <strong>Currencies:</strong>{" "}
              {Object.values(country.currencies || {})
                .map((currency) => `${currency.name} (${currency.symbol})`)
                .join(", ") || "No currency"}
            </div>
          </div>

          <Button className="button-bright mt-4" onClick={() => navigate("/")}>
            Back to countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountrySingle;
