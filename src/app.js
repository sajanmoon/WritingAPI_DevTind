const express = require("express");
const connectDB = require("./config/database");

const app = express();
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
