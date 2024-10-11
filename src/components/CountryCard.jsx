import { Button, Card, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavourite } from "../store/favouritesSlice";

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
            <Card.Title>{country.name.common}</Card.Title>
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
                .map((currency) => `${currency.name} (${currency.symbol})`)
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
            {!favouritesList.includes(country.name.common) && (
              <Button
                variant="primary"
                className="w-100"
                onClick={() => dispatch(addFavourite(country.name.common))}
              >
                Add Favourite
              </Button>
            )}

            {favouritesList.includes(country.name.common) && (
              <Button
                variant="warning"
                className="w-100"
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
