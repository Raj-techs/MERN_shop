const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRegisterRoute = require("./routes/user-route.js")
const bloodBankRegisterRoute = require("./routes/blood-bank-route.js")
const adminRegisterRoute = require("./routes/admin-route.js")
const cors = require("cors")


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes, adjust origin in production
app.use("/user", userRegisterRoute);
app.use("/bloodbank", bloodBankRegisterRoute);
app.use("/admin", adminRegisterRoute);

app.listen(4000, () => {
  console.log("server running at port 4000");
});

app.get('/',(req,res)=>{
  res.send("hello world")
})
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY...");
  })
  .catch((error) => {
    console.log(error);
  });
