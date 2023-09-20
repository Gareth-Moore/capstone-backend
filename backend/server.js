import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import shoppingListRoutes from "./routes/shoppingListRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import cookieParser from "cookie-parser";
import {
  routeNotFound,
  globalErrorHandler,
} from "./middleware/errorMiddleware.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;

// connect to database
connectDB();

// start express
const app = express();

// parse to json
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: "https://back-for-seconds.onrender.com",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
  })
);

// routes
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/shopping-list", shoppingListRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/recipes", recipeRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready..."));
}

// error handlers
app.use(routeNotFound);
app.use(globalErrorHandler);

app.listen(port, () => console.log(`Server has started on port: ${port}`));
