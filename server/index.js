require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const uploadRoutes = require('./routes/upload')
const settingRoutes = require('./routes/settings')
const offerRoutes = require('./routes/offers')
const rateRoutes = require('./routes/rates')

const app = express()
app.use(cors())
app.use(express.json())

// Static assets for Main Site
const rootPath = path.resolve(__dirname, '..')
app.use('/assets', express.static(path.resolve(rootPath, 'assets')))

// Static assets for Admin Dashboard (Vite build folder)
const adminDist = path.resolve(rootPath, 'client', 'dist')
if (fs.existsSync(adminDist)) {
  app.use('/assets', express.static(path.resolve(adminDist, 'assets')))
  app.use('/admin', express.static(adminDist))
  app.get('/admin/*', (req, res) => {
    res.sendFile(path.resolve(adminDist, 'index.html'))
  })
}

// Explicit endpoints for SEO Sitemap and Robots.txt to avoid general HTTP fetch errors and set explicit headers
app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.header('Cache-Control', 'public, max-age=86400');
  console.log(`[SEO] sitemap.xml requested by user-agent: ${req.headers['user-agent'] || 'Unknown'}`);
  res.sendFile(path.resolve(rootPath, 'sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.header('Cache-Control', 'public, max-age=86400');
  console.log(`[SEO] robots.txt requested by user-agent: ${req.headers['user-agent'] || 'Unknown'}`);
  res.sendFile(path.resolve(rootPath, 'robots.txt'));
});

// Serve top-level static site
app.use('/', express.static(rootPath))

// serve uploaded files
app.use('/uploads', express.static(path.resolve(rootPath, 'server', 'uploads')))

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/settings', settingRoutes)
app.use('/api/offers', offerRoutes)
app.use('/api/rates', rateRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server running on', PORT))
