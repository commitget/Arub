from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///reviews.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)

with app.app_context():
    db.create_all()

@app.route("/api/reviews", methods=["POST"])
def save_review():
    data = request.get_json(silent=True) or {}

    message = data.get("message", "").strip()
    if not message:
        return jsonify({"error": "Поле message обязательно"}), 400

    review = Review(message=message)

    try:
        db.session.add(review)
        db.session.commit()
        return jsonify({"status": "saved"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/", methods=["GET"])
def root():
    return "Backend работает"

if __name__ == "__main__":
    app.run(debug=True, port=5000)