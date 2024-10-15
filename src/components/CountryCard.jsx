import { Button, Card, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";

const CountryCard = ({ country }) => {
  const dispatch = useDispatch();
  const favouritesList = useSelector((state) => state.favourites.favourites);

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
            <Card.Title>{country.name.common}</Card.Title>
            <Card.Subtitle className="subtitle mb-5">
              {country.name.official}
            </Card.Subtitle>
          </div>
          <ListGroup variant="flush" className="mt-auto">
            <ListGroup.Item className="cstm-listgrp rounded-1">
              <i className="h5 bi bi-people me-2" />
              {country.population.toLocaleString()}
            </ListGroup.Item>
            <ListGroup.Item className="cstm-listgrp rounded-1">
              <i className="h5 bi bi-cash-coin me-2" />
              {Object.values(country.currencies || {})
                .map((currency) => `${currency.name} (${currency.symbol})`)
                .join(", ") || "No currency"}
            </ListGroup.Item>
            <ListGroup.Item className="cstm-listgrp rounded-1">
              <i className="h5 bi bi-chat-dots me-2" />
              {Object.values(country.languages || {})
                .map((language) => language)
                .join(", ") || "No official language"}
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
