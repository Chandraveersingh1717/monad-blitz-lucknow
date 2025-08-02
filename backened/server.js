
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import newsletterRoutes from "./routes/newsletter.js";
import contactRoutes from "./routes/contact.js"; // NEW contact route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = ["http://localhost:3000"];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes); 


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
