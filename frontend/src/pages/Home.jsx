import React, { useEffect, useState } from "react";
import { Container, Carousel, Spinner, Alert } from "react-bootstrap";

const Home = () => {
  const [carouselCharacters, setCarouselCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/characters")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch characters");
        return res.json();
      })
      .then((data) => {
        // You can customize this slice if you want different characters
        setCarouselCharacters(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4">Welcome to the Marvel Character Hub</h1>
      <p className="lead mb-5">
        Browse, edit, and discover amazing Marvel heroes and villains!
      </p>

      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Carousel className="mb-5" interval={3500}>
          {carouselCharacters.map((char) => (
            <Carousel.Item key={char.id}>
              <img
                className="d-block mx-auto"
                src={char.image_url}
                alt={char.name}
                style={{
                  height: "350px",
                  width: "auto",
                  objectFit: "contain",
                  objectPosition: "center",
                  borderRadius: "10px",
                }}
              />
            <Carousel.Caption
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  padding: "1rem 2rem",
                  borderRadius: "12px",
                  bottom: "20px", // Pushes caption down
                  left: "50%",
                  transform: "translateX(-50%)", // Center horizontally
                  maxWidth: "80%",
                  textAlign: "center"
  }}
>
  <h5 className="text-white fw-bold">{char.name}</h5>
  <p className="text-white small">{char.powers}</p>
</Carousel.Caption>

            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </Container>
  );
};

export default Home;
