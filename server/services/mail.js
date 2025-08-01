const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const PDFDocument = require('pdfkit');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// ✅ Helper to generate PDF as a buffer
const generateInvoiceBuffer = (order) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));

    doc.fontSize(20).text('Cartiva Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Order ID: ${order._id}`);
    doc.text(`Total: ₹${order.total}`);
    doc.text(`Email: ${order.user?.email || 'N/A'}`);
    doc.text(`Date: ${new Date(order.created).toLocaleString()}`);
    doc.moveDown();

    doc.text('Products:');
    order.products.forEach(p => {
      doc.text(`- ${p.product.name} (₹${p.product.price}) x ${p.quantity}`);
    });

    doc.end();
  });
};

exports.sendOrderEmail = async (to, order) => {
  const templatePath = path.join(__dirname, '../templates/orderConfirmation.html');
  const source = fs.readFileSync(templatePath, 'utf-8');
  const template = handlebars.compile(source);

  const html = template({
    email: to,
    orderId: order._id,
    total: order.total,
    products: order.products.map(p => ({
      name: p.product.name,
      price: p.product.price,
      quantity: p.quantity
    }))
  });

  try {
    const pdfBuffer = await generateInvoiceBuffer(order); // ✅ generate invoice
    const info = await transporter.sendMail({
      from: `"Cartiva" <${process.env.EMAIL_FROM}>`,
      to,
      subject: 'Your Order Confirmation',
      html,
      attachments: [
        {
          filename: `invoice_${order._id}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });
    console.log('📨 Email sent:', info.messageId);
  } catch (err) {
    console.error('❌ Email sending failed:', err);
  }
};
