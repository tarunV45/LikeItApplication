import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./components/posts.js";

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

const port = process.env.PORT;

mongoose
  .connect(process.env.CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log("Server running on port: " + port));
  })
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
