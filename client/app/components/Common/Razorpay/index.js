// Wherever you define RazorpayButton
import React from 'react';
import { connect } from 'react-redux';
import { placeOrder } from '../../../containers/Order/actions';
import { clearCart } from '../../../containers/Cart/actions';

const RazorpayButton = ({ amount, placeOrder, clearCart }) => {
  const loadRazorpay = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';

    script.onload = () => {
      const options = {
        key: 'rzp_test_m4KKbE7fWigXTN',
        amount: amount * 100,
        currency: 'INR',
        name: 'Cartiva',
        description: 'Test Transaction',
        handler: function (response) {
          alert(`✅ Payment successful: ${response.razorpay_payment_id}`);
          placeOrder();
          clearCart();
        },
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#000000'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    script.onerror = () => {
      alert('🛑 Razorpay SDK failed to load.');
    };

    document.body.appendChild(script);
  };

  return (
    <button
      onClick={loadRazorpay}
      style={{
        padding: '10px 20px',
        backgroundColor: '#ffffff',
        color: '#000000',
        border: '1px solidrgb(15, 147, 255)',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
      }}
      onMouseOver={e => (e.target.style.backgroundColor = '#f2f2f2')}
      onMouseOut={e => (e.target.style.backgroundColor = '#ffffff')}
    >
       💸 Pay ₹{amount}
    </button>
  );
};

const mapDispatchToProps = {
  placeOrder,
  clearCart
};

export default connect(null, mapDispatchToProps)(RazorpayButton);
