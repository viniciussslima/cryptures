require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const router = require("./routes");
const ether = require("./ether");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  auth: {
    authSource: "admin",
  },
});

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_URL,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.use("/cryptures/images", express.static("./api/public"));

app.listen(process.env.API_PORT, () => {
  console.log("Api rodando na porta " + process.env.API_PORT);
});
