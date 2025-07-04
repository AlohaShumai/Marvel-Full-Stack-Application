import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CharacterList = ({ characters }) => {
  return (
        <Container
          className="mx-auto"
          style={{
            backgroundColor: "#ffffff",           
            borderRadius: "16px",                 
            minHeight: "100vh",
            padding: "2rem",
            maxWidth: "1200px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)", 
            }}
          >

      <Row className="g-4 justify-content-center">
        {characters.map((character) => (
          <Col key={character.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={character.image_url}
                alt={character.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold">{character.name}</Card.Title>
                  <Card.Text>
                    <strong>Alignment:</strong> {character.alignment}
                    <br />
                    <strong>Powers:</strong> {character.powers}
                  </Card.Text>
                </div>
                <Button
                  as={Link}
                  to={`/characters/${character.id}`}
                  variant="primary"
                  className="mt-3"
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CharacterList;
