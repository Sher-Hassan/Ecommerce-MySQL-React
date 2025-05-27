import { Router } from 'express';
const router = Router();
import { addToCart, getCart, clearCart } from '../controllers/cartController.js';

// Add to cart
router.post('/add', addToCart);

// Get cart items for a user
router.get('/:userId', getCart);

// Clear cart (DELETE)
router.delete('/clearCart/:userId', clearCart);

export default router;
