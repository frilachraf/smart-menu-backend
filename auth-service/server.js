import express from 'express'
import { supabase } from './src/supabase/supabaseClient.js'
import { authMiddleware } from './src/supabase/middleware.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}));

const whitelist = new Set([
  "http://localhost:3000",
  "http://localhost:5000",
  "https://website-backend-q8wu.onrender.com",
  "https://onechoice-test.netlify.app",
  "https://onchoice-agency.netlify.app",
  "https://onechoice-admin.netlify.app",
]);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.has(origin)) {
        callback(null, true);
      } else {
        const error = new Error("Not allowed by CORS");
        error.status = 450;
        callback(error);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-CSRF-Token",
      "Accept-Language",
    ],
    exposedHeaders: ["Content-Length", "X-Powered-By"],
    maxAge: 600,
    credentials: true,
  })
);


// Signup
app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// Protected route
app.get('/api/auth/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome!', user: req.user })
})

app.listen(process.env.PORT, () => console.log('🚀 API running on http://localhost:8000'))
