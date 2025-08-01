// client/app/components/Common/DownloadInvoiceButton/index.js
import React from 'react';
import { downloadInvoice } from '../../../utils/invoice';
import './index.css'; // Import styles

const DownloadInvoiceButton = ({ orderId }) => {
  const handleClick = () => downloadInvoice(orderId);

  return (
    <button className="download-invoice-btn" onClick={handleClick}>
      📄 Download Invoice
    </button>
  );
};

export default DownloadInvoiceButton;
