import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Spinner,
  Alert,
  Button,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";

const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/characters/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Character not found");
        }
        return res.json();
      })
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/characters/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete character.");
        return res.json();
      })
      .then(() => {
        setShowToast(true);
        setTimeout(() => navigate("/characters"), 1800);
      })
      .catch((err) => setError(err.message));
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="detail-card mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Img
          variant="top"
          src={character.image_url}
          alt={character.name}
          style={{ objectFit: "cover", height: "400px" }}
        />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Text>
            <strong>Alignment:</strong> {character.alignment} <br />
            <strong>Powers:</strong> {character.powers}
          </Card.Text>
          <Button
            variant="warning"
            className="mt-3 me-2"
            onClick={() => navigate(`/characters/${id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="mt-3"
            onClick={() => setShowModal(true)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>

      {/* Modal Confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{character.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-middle" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          bg="success"
          delay={1500}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Marvel App</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Character deleted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default CharacterDetail;
