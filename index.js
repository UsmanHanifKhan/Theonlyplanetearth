const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/send-email', async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'planetearthwebsite@gmail.com', // Replace with your email
        pass: 'qtipcofahqrshskd' // Replace with your password or an app-specific password
      }
    });
  
    const mailOptions = {
      from: 'planetearthwebsite@gmail.com',
      to: 'info@theonlyplanetearth.com , Director@hiadigi.com',
      subject: 'New Contact Form Submission',
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
