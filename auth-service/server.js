import express from 'express'
import { supabase } from './src/supabase/supabaseClient.js'
import { authMiddleware } from './src/supabase/middleware.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}));
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

app.listen(process.env.PORT, () => console.log('🚀 API running on http://localhost:3000'))
