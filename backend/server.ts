import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Для скачивания файлов

// MongoDB подключение
mongoose.connect('mongodb+srv://your_user:your_pass@cluster0.mongodb.net/arub?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Модели
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'accountant'], default: 'client' },
});

const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  path: String,
  month: String,
  uploadDate: { type: Date, default: Date.now },
});

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  path: String,
  uploadDate: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accountantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  sender: String, // 'client' or 'accountant'
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', documentSchema);
const Report = mongoose.model('Report', reportSchema);
const Message = mongoose.model('Message', messageSchema);

// Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Middleware for auth
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, 'secret_key'); // Замените на реальный секрет
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isAccountant = (req, res, next) => {
  if (req.user.role !== 'accountant') return res.status(403).json({ message: 'Access denied' });
  next();
};

// Routes for auth
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashed });
    res.json({ message: 'Registered' });
  } catch (err) {
    res.status(400).json({ message: 'User exists' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});

// Documents
app.post('/documents', authenticate, upload.single('file'), async (req, res) => {
  const { month } = req.body;
  const doc = await Document.create({
    userId: req.user.id,
    filename: req.file.originalname,
    path: req.file.path,
    month,
  });
  res.json(doc);
});

app.get('/documents', authenticate, async (req, res) => {
  const { month } = req.query;
  const filter = { userId: req.user.id };
  if (month) filter.month = month;
  const docs = await Document.find(filter).sort({ uploadDate: -1 });
  res.json(docs);
});

app.delete('/documents/:id', authenticate, async (req, res) => {
  const doc = await Document.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (doc) fs.unlinkSync(doc.path);
  res.json({ message: 'Deleted' });
});

// Reports
app.get('/reports', authenticate, async (req, res) => {
  const reports = await Report.find({ userId: req.user.id }).sort({ uploadDate: -1 });
  res.json(reports);
});

// Chat
app.post('/chat', authenticate, async (req, res) => {
  const { accountantId, message } = req.body;
  const msg = await Message.create({
    userId: req.user.id,
    accountantId,
    message,
    sender: req.user.role,
  });
  res.json(msg);
});

app.get('/chat/:accountantId', authenticate, async (req, res) => {
  const filter = { userId: req.user.id, accountantId: req.params.accountantId };
  const msgs = await Message.find(filter).sort({ date: 1 });
  res.json(msgs);
});

// Admin routes
app.get('/admin/clients', authenticate, isAccountant, async (req, res) => {
  const clients = await User.find({ role: 'client' });
  res.json(clients);
});

app.get('/admin/documents/:userId', authenticate, isAccountant, async (req, res) => {
  const docs = await Document.find({ userId: req.params.userId });
  res.json(docs);
});

app.post('/admin/reports', authenticate, isAccountant, upload.single('file'), async (req, res) => {
  const { userId } = req.body;
  const report = await Report.create({
    userId,
    filename: req.file.originalname,
    path: req.file.path,
  });
  res.json(report);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));