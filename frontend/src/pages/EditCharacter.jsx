import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const EditCharacter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    alignment: "",
    powers: "",
    image_url: ""
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/characters/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch character data.");
        return res.json();
      })
      .then((data) => setFormData(data))
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    fetch(`http://localhost:5000/api/characters/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update character.");
        return res.json();
      })
      .then(() => {
        setSuccess("Character updated successfully!");
        setTimeout(() => navigate(`/characters/${id}`), 1500);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  if (fetching) return <div className="text-center py-5"><Spinner animation="border" /></div>;

  return (
    <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4">Edit Character</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name *</Form.Label>
        <Form.Control
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="alignment">
        <Form.Label>Alignment *</Form.Label>
        <Form.Control
          as="select"
          name="alignment"
          required
          value={formData.alignment}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="hero">Hero</option>
          <option value="villain">Villain</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="powers">
        <Form.Label>Powers *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="powers"
          required
          value={formData.powers}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-4" controlId="image_url">
        <Form.Label>Image URL *</Form.Label>
        <Form.Control
          type="url"
          name="image_url"
          required
          value={formData.image_url}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="d-grid">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Update Character"}
        </Button>
      </div>
    </Form>
  );
};

export default EditCharacter;
