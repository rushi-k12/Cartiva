const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // INR in paise
      currency: 'INR',
      receipt: 'order_rcptid_11'
    };

    const order = await razorpay.orders.create(options);
    return res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/ping', (req, res) => {
  res.send('✅ Payment route is active');
});


module.exports = router;
