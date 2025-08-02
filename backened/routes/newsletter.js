
import express from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,       
    pass: process.env.EMAIL_PASS,      
  },
});

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existing = await Subscription.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    const subscription = new Subscription({ email });
    await subscription.save();

    await transporter.sendMail({
      from: `"NFTs MarketPlace" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Subscribing!",
      html: `
        <h2>Thank you for subscribing to our newsletter! 🛒</h2>
        <p>We're excited to keep you updated with our latest NFTs with you</p>
        <br/>
        <strong>- Our NFTs MarketPlace Team</strong><br/><br/><br/><br/>
        <strong>Chandraveer Singh</strong><br/>
        <strong>Head of Department</strong><br/>
        <br/>
      `,
    });

    res.status(201).json({ message: "Subscription successful and email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find().sort({ subscribedAt: -1 });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
