// client/app/utils/invoice.js
import 'regenerator-runtime/runtime'; // ✅ Add this
import axios from 'axios';

export const downloadInvoice = async (orderId) => {
  try {
const response = await axios.get(`http://localhost:5000/api/invoice/${orderId}`, {
  responseType: 'blob'
});


    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice_${orderId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('[INVOICE DOWNLOAD ERROR]', error);
    alert('Could not download invoice. Please try again.');
  }
};
