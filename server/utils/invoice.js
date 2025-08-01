// server/utils/invoice.js
const fs = require('fs');
const PDFDocument = require('pdfkit');

/**
 * Generates an invoice PDF for the given order and saves it to filePath
 * @param {Object} order - order object with _id, user, products, total
 * @param {string} filePath - where to save the PDF
 */
exports.generateInvoicePDF = (order, filePath) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text('🧾 Cartiva Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Order ID: ${order._id}`);
    doc.text(`Customer: ${order.user.name} (${order.user.email})`);
    doc.text(`Total: ₹${order.total}`);
    doc.moveDown();

    doc.text('Items:', { underline: true });
    order.products.forEach((p, i) => {
      doc.text(`${i + 1}. ${p.product.name} × ${p.quantity} = ₹${p.product.price * p.quantity}`);
    });

    doc.end();

    stream.on('finish', resolve);
    stream.on('error', reject);
  });
};
