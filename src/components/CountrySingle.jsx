import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Image, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CountrySingle = () => {
  const location = useLocation();
  const country = location.state.country;
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

  // Show weather data here (min req: Temp, weather desciption, icon)

  return (
    <Container fluid className="mt-5 d-flex flex-column align-items-center">
      <div>{weather.main.temp.toFixed(1)} °C</div>
      <div>
        <Image
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
      </div>
      <div>{weather.weather[0].description}</div>
    </Container>
  );
};

export default CountrySingle;
