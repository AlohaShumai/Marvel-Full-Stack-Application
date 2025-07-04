import CharacterList from "../Components/CharacterList";
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/characters")
      .then((res) => res.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }} className="d-flex align-items-center justify-content-center">
      <Container fluid className="py-5">
        <h2 className="text-center mb-4 text-white">All Marvel Characters</h2>
        <CharacterList characters={characters} />
      </Container>
    </div>
  );
}

export default Characters;

