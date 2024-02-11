import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const BookCard = ({ book, onBookClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Button onClick={() => onBookClick(book)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};