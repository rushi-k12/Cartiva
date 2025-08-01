// server/utils/generateInvoice.js

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const generateInvoice = async (data) => {
  const filePath = path.join(__dirname, `../../invoices/invoice_${data._id}.pdf`);
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text('Invoice', { align: 'center' });
  doc.moveDown();
  doc.text(`Order ID: ${data._id}`);
  doc.text(`Customer: ${data.customer}`);
  doc.text(`Date: ${data.created ? new Date(data.created).toLocaleDateString() : 'Invalid Date'}`);
  doc.text(`Total Amount: $${data.total || 0}`);
  doc.moveDown();

  doc.fontSize(16).text('Items:', { underline: true });
  doc.moveDown();

  if (data.products && data.products.length > 0) {
    data.products.forEach((item, i) => {
      const name = item.product?.name || 'Unnamed Product';
      const qty = item.quantity || 0;
      const price = item.product?.price || 0;
      doc.text(`${i + 1}. ${name} - Qty: ${qty} - $${price}`);
    });
  } else {
    doc.text('No items in order.');
  }

  doc.end();

  return filePath;
};

module.exports = generateInvoice;
