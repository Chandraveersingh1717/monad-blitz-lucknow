import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log("❌ Email verification error:", error);
  } else {
    console.log("📧 Email transporter ready");
  }
});

router.post("/", (req, res) => {
  const name = req.body.firstName + " " + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;

  const ownerMail = {
    from: `C S NFTS MarketPlce <${email}>`,
    to: process.env.EMAIL_USER,
    subject: "Contact Form Submission -  CS NFT Marketplace",
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  const thankYouMail = {
    from: `Chandraveer Singh <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank You for Contacting Me",
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for reaching out! I’ve received your message and will respond shortly.</p>
      <hr>
      <p><strong>Your Message:</strong><br>${message}</p>
      <p><strong>Your Phone:</strong> ${phone}</p>
      <hr>
      <p>Best regards,<br>Chandraveer Singh</p>
    `
  };

  contactEmail.sendMail(ownerMail, (error) => {
    if (error) {
      console.log("❌ Error sending email to owner:", error);
      return res.status(500).json({ status: "Failed to send message", error });
    }

    contactEmail.sendMail(thankYouMail, (err) => {
      if (err) {
        console.log("❌ Error sending thank-you email:", err);
        return res.status(500).json({ status: "Failed to send thank-you", err });
      }

      return res.status(200).json({ status: "Message Sent Successfully" });
    });
  });
});

export default router;
