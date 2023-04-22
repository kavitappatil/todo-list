const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

require("dotenv").config();

mongoose
  //.connect("mongodb://localhost:27017/todo-app", { useNewUrlParser: true })
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/api", routes);

    app.listen(3001, () => {
      console.log("Server has started!");
    });
  });