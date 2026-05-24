import random
import os
from flask import Flask, request, jsonify, abort, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, timedelta
# from dotenv import load_dotenv

app = Flask(__name__)

def passgen():
    chars = '+-/*!&$#?=@<>abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    length = 12
    password = ''.join(random.choice(chars) for _ in range(length))
    return password

CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "supports_credentials": True,
        "allow_headers": ["Content-Type", "Accept"],
        "methods": ["GET", "POST", "OPTIONS"]
    }
})

app.secret_key = "bQau}I04lsh01G_gA5hyJ:*Xd$@B–?"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///reviews.db"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///bid.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.permanent_session_lifetime = timedelta(days=30)

db = SQLAlchemy(app)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.Text, nullable=False)

class Bid(db.Model):
    __tablename__ = "bids"
    id = db.Column(db.Integer, primary_key=True)
    name    = db.Column(db.String(18), nullable=False)
    email   = db.Column(db.String(30), nullable=False)
    phone   = db.Column(db.String(30), nullable=True)
    message = db.Column(db.Text, nullable=True)
    created = db.Column(db.DateTime, server_default=db.func.now())
    password = db.Column(db.String(20), nullable = False )

with app.app_context():
    db.create_all()

with app.app_context():
    if not Bid.query.filter_by(email="admin@a.a").first():
        admin = Bid(name="admin", email="admin@a.a", password="a9")
        db.session.add(admin)
        db.session.commit()

# @app.before_request
# def make_session_permanent():
#     session.permanent = True
    
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

@app.route("/api/bid", methods=["POST"])
def save_bid():
    data = request.get_json(silent=True) or {}

    name    = data.get("name", "").strip()
    email   = data.get("email", "").strip()
    phone   = data.get("phone", "").strip()
    message = data.get("message", "").strip()
    password = passgen()

    if not name:
        return jsonify({"error": "Поле 'name' обязательно"}), 400
    if not email:
        return jsonify({"error": "Поле 'email' обязательно"}), 400

    bid = Bid(
        name=name,
        email=email,
        phone=phone or None,
        message=message or None,
        password=password
    )

    try:
        db.session.add(bid)
        db.session.commit()
        return jsonify({"status": "saved"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "email и password обязательны"}), 400

    user = Bid.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({"error": "Неверный email или пароль"}), 401

    session["user_id"] = user.id
    session["email"] = user.email

    return jsonify({
        "status": "success",
        "message": "Вход выполнен",
        "user": {"email": user.email, "name": user.name or "Без имени"}
    }), 200


@app.route("/api/profile", methods=["GET"])
def get_profile():
    if "user_id" not in session:
        return jsonify({"error": "Не авторизован"}), 401

    user = Bid.query.get(session["user_id"])
    if not user:
        session.clear()
        return jsonify({"error": "Пользователь не найден"}), 404

    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email
    }), 200


@app.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"status": "logged_out"}), 200

@app.route("/", methods=["GET"])
def root():
    return "Backend работает"

if __name__ == "__main__":
    app.run(debug=True, port=5000)