import { Button, Card, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";

const CountryCard = ({ country }) => {
  const dispatch = useDispatch();
  const favouritesList = useSelector((state) => state.favourites.favourites);
  const currencies =
    Object.values(country.currencies || {})
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ") || "No currency";
  const languages =
    Object.values(country.languages || {})
      .map((language) => language)
      .join(", ") || "No official language";

  return (
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
            className="rounded"
            style={{
              objectFit: "cover",
              minHeight: "200px",
              maxHeight: "200px",
              minWidth: "100%",
            }}
          />
        </Link>
        <Card.Body className="card d-flex flex-column">
          <div className="flex-grow-1">
            <Card.Title>
              {favouritesList.includes(country.name.common) && (
                <i
                  className="h5 bi bi-star-fill me-2"
                  style={{ color: "#a47ae0" }}
                />
              )}
              {country.name.common}
            </Card.Title>
            <Card.Subtitle
              className="shorten subtitle mb-5"
              title={country.name.official}
            >
              {country.name.official}
            </Card.Subtitle>
          </div>
          <ListGroup variant="flush" className="mt-auto">
            <ListGroup.Item className="cstm-listgrp rounded-1">
              <i className="h5 bi bi-people me-2" />
              {country.population.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item className="cstm-listgrp rounded-1">
              <i className="h5 bi bi-grid-3x3 me-2" />
              {country.area.toLocaleString()} km²
            </ListGroup.Item>
            <ListGroup.Item
              className="shorten cstm-listgrp rounded-1"
              title={currencies}
            >
              <i className="h5 bi bi-cash-coin me-2" />
              {currencies}
            </ListGroup.Item>
            <ListGroup.Item
              className="shorten cstm-listgrp rounded-1"
              title={languages}
            >
              <i className="h5 bi bi-chat-dots me-2" />
              {languages}
            </ListGroup.Item>
          </ListGroup>
          <div className="mt-3">
            {!favouritesList.includes(country.name.common) && (
              <Button
                className="button-bright w-100"
                onClick={() => dispatch(addFavourite(country.name.common))}
              >
                Add Favourite
              </Button>
            )}

            {favouritesList.includes(country.name.common) && (
              <Button
                variant="warning"
                className="button-dark w-100"
                onClick={() => dispatch(removeFavourite(country.name.common))}
              >
                Remove Favourite
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CountryCard;
