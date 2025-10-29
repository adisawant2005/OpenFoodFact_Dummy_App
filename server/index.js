import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import axios from 'axios';

const app = express();

// Basic middleware
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Example API route - returns query param or default
app.get('/api/echo', (req, res) => {
  const { msg = 'hello' } = req.query;
  res.json({ echoed: msg });
});

// OpenFoodFacts product lookup
// GET /api/product/:barcode
// Returns a compact product representation or appropriate error
app.get('/api/product/:barcode', async (req, res) => {
  const { barcode } = req.params;

  if (!/^[0-9A-Za-z_-]+$/.test(barcode)) {
    return res.status(400).json({ error: 'invalid_barcode', message: 'Barcode contains invalid characters' });
  }

  const url = `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(barcode)}.json`;

  try {
    const response = await axios.get(url, { timeout: 5000 });
    const data = response.data;

    if (!data || data.status !== 1) {
      return res.status(404).json({ error: 'not_found', message: 'Product not found' });
    }

    const p = data.product || {};
    const compact = {
      code: p.code || barcode,
      product_name: p.product_name || p.product_name_en || null,
      brands: p.brands || null,
      quantity: p.quantity || null,
      nutriments: p.nutriments || null,
      image: p.image_small_url || p.image_url || null,
    };

    return res.json({ product: compact, raw_status: data.status_verbose || null });
  } catch (err) {
    // network/timeout or upstream error
    if (err.code === 'ECONNABORTED') {
      return res.status(504).json({ error: 'timeout', message: 'Upstream request timed out' });
    }
    return res.status(502).json({ error: 'upstream_error', message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
