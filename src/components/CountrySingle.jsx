import axios from "axios";
import { useEffect, useState } from "react";
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

  const dispatch = useDispatch();
  //   console.log("location:", location);
  //   console.log("navigate:", navigate);

  console.log("Country:", country);

  //   Not working yet:
  //   useEffect(() => {
  //     if (!location.state.country) {
  //       navigate("/countries");
  //     }
  //   }, [location.state.country, navigate]);

  return <div>CountrySingle</div>;
};

export default CountrySingle;
