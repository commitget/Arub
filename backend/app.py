from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(name)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/arub'  # Замените на ваш URI
app.config['JWT_SECRET_KEY'] = 'secret'  # Замените
app.config['UPLOAD_FOLDER'] = 'uploads'
db = SQLAlchemy(app)
jwt = JWTManager(app)

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  email = db.Column(db.String(100), unique=True)
  phone = db.Column(db.String(20))
  avatar = db.Column(db.String(200))

# Создание БД
with app.app_context():
  db.create_all()

@app.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
  user_id = get_jwt_identity()
  user = User.query.get(user_id)
  if user:
    return jsonify({
      'name': user.name,
      'email': user.email,
      'phone': user.phone,
      'avatar': user.avatar
    })
  return jsonify({'message': 'User not found'}), 404

@app.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
  user_id = get_jwt_identity()
  user = User.query.get(user_id)
  data = request.json
  if user:
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.phone = data.get('phone', user.phone)
    user.avatar = data.get('avatar', user.avatar)
    db.session.commit()
    return jsonify({'message': 'Profile updated'})
  return jsonify({'message': 'User not found'}), 404

@app.route('/upload-avatar', methods=['POST'])
@jwt_required()
def upload_avatar():
  user_id = get_jwt_identity()
  user = User.query.get(user_id)
  if 'avatar' not in request.files:
    return jsonify({'message': 'No file'}), 400
  file = request.files['avatar']
  filename = secure_filename(file.filename)
  file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
  user.avatar = f"/uploads/{filename}"
  db.session.commit()
  return jsonify({'avatarUrl': user.avatar})

if name == 'main':
  app.run(port=5000, debug=True)