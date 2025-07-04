from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    alias = db.Column(db.String(100))
    alignment = db.Column(db.String(20))
    powers = db.Column(db.Text)
    image_url = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "alias": self.alias,
            "alignment": self.alignment,
            "powers": self.powers,
            "image_url": self.image_url
        }
