const express = require('express');
const router = express.Router();
const Order = require('../../models/order');
const generateInvoice = require('../../utils/generateInvoice'); // This should be a function, not a router!
const path = require('path');

//  GET /api/invoice/:orderId
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate({
        path: 'cart',
        populate: {
          path: 'products.product',
          populate: { path: 'brand' }
        }
      })
      .populate('user');

    if (!order || !order.cart) {
      return res.status(404).json({ error: 'Order not found or missing cart' });
    }

    const invoiceData = {
      _id: order._id,
      created: order.created,
      total: order.total,
      customer: order.user?.email || 'Unknown',
      products: order.cart.products
    };

    const invoicePath = await generateInvoice(invoiceData);

    setTimeout(() => {
      res.download(invoicePath);
    }, 500);
  } catch (err) {
    console.error('[INVOICE ERROR]', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
