import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Spinner, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const CharacterForm = ({ isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    alignment: "",
    powers: "",
    image_url: ""
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      setFetching(true);
      fetch(`http://localhost:5000/api/characters/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch character data.");
          return res.json();
        })
        .then((data) => setFormData(data))
        .catch((err) => setError(err.message))
        .finally(() => setFetching(false));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://localhost:5000/api/characters/${id}`
      : "http://localhost:5000/api/characters";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error(isEdit ? "Failed to update character." : "Failed to add character.");
        return res.json();
      })
      .then(() => {
        setSuccess(isEdit ? "Character updated successfully!" : "Character added successfully!");
        setTimeout(() => {
          navigate(isEdit ? `/characters/${id}` : "/characters");
        }, 1200);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  if (fetching) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h2 className="text-center mb-4">{isEdit ? "Edit Character" : "Add New Character"}</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter character name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAlignment">
              <Form.Label>Alignment</Form.Label>
              <Form.Control
                required
                type="text"
                name="alignment"
                value={formData.alignment}
                onChange={handleChange}
                placeholder="Hero, Villain, etc."
              />
              <Form.Control.Feedback type="invalid">
                Please specify an alignment.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPowers">
              <Form.Label>Powers</Form.Label>
              <Form.Control
                required
                type="text"
                name="powers"
                value={formData.powers}
                onChange={handleChange}
                placeholder="Enter powers"
              />
              <Form.Control.Feedback type="invalid">
                Please describe the powers.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                required
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid image URL.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : isEdit ? "Update Character" : "Add Character"}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CharacterForm;
