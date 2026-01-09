// server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import connectDB from "./configs/db.js";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const port = process.env.PORT || 3000;

await connectDB();

// Inngest endpoint FIRST and unprotected
app.use("/api/inngest", serve({ client: inngest, functions }));

// Your normal API middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Health route
app.get("/", (req, res) => res.send("Server is Live!"));

// Local dev listener (Vercel will ignore this export)
if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

export default app;
