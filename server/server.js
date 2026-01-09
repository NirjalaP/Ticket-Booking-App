import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";

import connectDB from "./configs/db.js";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const port = process.env.PORT || 3000;

// 1. Connect DB
await connectDB();

// 2. MUST COME FIRST → parse JSON bodies
app.use(express.json());

// 3. OPTIONAL but safe → CORS
app.use(cors());

// 4. MUST COME BEFORE CLERK → Inngest handler
app.use("/api/inngest", serve({ client: inngest, functions }));

// 5. Clerk AFTER Inngest (important!)
app.use(clerkMiddleware());

// 6. Your other routes
app.get("/", (req, res) => res.send("Server is Live!"));

// Local dev listener
if (process.env.VERCEL !== "1") {
  app.listen(port, () => console.log(`Server @ http://localhost:${port}`));
}

export default app;
