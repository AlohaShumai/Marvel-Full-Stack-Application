from flask import Flask, jsonify, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Neuy1240@localhost/marvel_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# Character model
class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    alignment = db.Column(db.String(50))
    powers = db.Column(db.Text)
    image_url = db.Column(db.String(255))

# Character schema
class CharacterSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Character
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    alignment = ma.auto_field()
    powers = ma.auto_field()
    image_url = ma.auto_field()

character_schema = CharacterSchema()            # For single character
characters_schema = CharacterSchema(many=True)  # For multiple characters

# Route for all characters
@app.route("/api/characters", methods=["GET"])
def get_characters():
    all_characters = Character.query.all()
    return characters_schema.jsonify(all_characters)

# Route for single character by ID
@app.route("/api/characters/<int:id>", methods=["GET"])
def get_character(id):
    character = Character.query.get(id)
    if character is None:
        return {"error": "Character not found"}, 404
    return character_schema.dump(character), 200

# Route to update a character by ID
@app.route("/api/characters/<int:id>", methods=["PUT"])
def update_character(id):
    character = Character.query.get(id)
    if character is None:
        return {"error": "Character not found"}, 404

    data = request.get_json()
    character.name = data.get("name", character.name)
    character.alignment = data.get("alignment", character.alignment)
    character.powers = data.get("powers", character.powers)
    character.image_url = data.get("image_url", character.image_url)

    db.session.commit()
    return character_schema.jsonify(character)

# Route to delete a character by ID
@app.route("/api/characters/<int:id>", methods=["DELETE"])
def delete_character(id):
    character = Character.query.get(id)
    if character is None:
        return {"error": "Character not found"}, 404

    db.session.delete(character)
    db.session.commit()
    return {"message": "Character deleted"}, 200

# Route for root URL to auto-redirect to /api/characters
@app.route("/")
def root():
    return redirect("/api/characters")

if __name__ == '__main__':
    app.run(debug=True)
