const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();
const jwt = require('jsonwebtoken');
const blacklist = require('./auth').blacklist; // Impor blacklist dari auth.js

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Periksa apakah token ada di blacklist
  if (blacklist.has(token)) {
    return res.status(401).json({ error: 'Token has been invalidated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Tambahkan info pengguna ke request
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// CREATE Product
router.post('/', authenticate, async (req, res) => {
  const { name, image, size, price, qty } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        image,
        size,
        price,
        qty,
        userId: req.user.id, // Ambil user ID dari token
      },
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// READ All Products for Logged-in User
router.get('/', authenticate, async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: { userId: req.user.id },
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// READ ALL PRODUCT WITHOUT AUTH
router.get('/all', async (req, res) => {
    try {
      // Mengambil hanya kolom 'name' dan 'image' dari produk
      const products = await prisma.product.findMany({
        select: {
          name: true,   // Menampilkan kolom 'name'
          image: true   // Menampilkan kolom 'image'
        }
      });
  
      res.status(200).json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // Menampilkan detail produk berdasarkan ID tanpa autentikasi
router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },  // Mengambil produk berdasarkan ID
      });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch product details' });
    }
  });
  

// UPDATE Product
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, image, size, price, qty } = req.body;

  try {
    const product = await prisma.product.updateMany({
      where: { id: parseInt(id), userId: req.user.id },
      data: { name, image, size, price, qty },
    });

    if (product.count === 0) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE Product
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.deleteMany({
      where: { id: parseInt(id), userId: req.user.id },
    });

    if (product.count === 0) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
