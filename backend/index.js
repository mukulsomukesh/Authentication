const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectionDB = require("./config/db");
const userRoutes = require("./routes/user.routes")

dotenv.config();
const app = express();
connectionDB();
app.use(cors());
app.use(express.json());


app.get("/", (req, res)=>{
    res.status(200).json({message:"Authentication Application "})
})


// authentication routes
app.use("/api/auth", userRoutes);


const port = process.env.PORT || 9001
app.listen(port, console.log("server started on port ", port) )