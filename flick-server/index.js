require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const allRoutes = require("./routes/allRoutes");

// Connect to MongoDB
connectDB();

const flickServer = express();

flickServer.use(cors());
flickServer.use(express.json());

// Routes
flickServer.use("/", allRoutes);

const PORT = process.env.PORT || 3000;

flickServer.listen(PORT, () => {
  console.log(`Server started running at port ${PORT}`);
});
