const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user-route.js")
const bloodBankRoute = require("./routes/banksRoute.js")
const adminRoute = require("./routes/govRoute.js")
const cors = require("cors")


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); 

app.use("/user", userRoute);
app.use("/bloodbank", bloodBankRoute);
app.use("/admin", adminRoute);

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
