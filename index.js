import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
// import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import dotenv from "dotenv";
import postRouter from "./routes/post_route.js"
dotenv.config();
import db from "./config/db.js"
db();

const app = express();

// Security middleware
app.use(helmet());
// app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Compression
app.use(compression());



// Routes

app.use('/api/posts', postRouter);


// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});



// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
