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

// 1) Global middleware FIRST
app.use(express.json());
app.use(cors());

// 2) Inngest endpoint (no Clerk in front of it)
app.use("/api/inngest", serve({ client: inngest, functions }));

// 3) Clerk for the rest of your routes
app.use(clerkMiddleware());

// Example route
app.get("/", (req, res) => res.send("Server is Live!"));

// Local dev listener (Vercel ignores this)
if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

export default app;
