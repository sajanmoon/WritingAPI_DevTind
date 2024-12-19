const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");

const app = express();

// Here we are using to cors widdleware so that api can talk to frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// middleware for json
app.use(express.json());

// import routes
const authRouter = require("./routes/user");

// direct to route
app.use("/", authRouter);

connectDB()
  .then(() => {
    console.log("Database connect succesffully");
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected", ErrorEvent);
  });
