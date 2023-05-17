const dotEnv = require('dotenv')
dotEnv.config()
const express = require("express");
const app = express()
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT=process.env.PORT
const seekerRoutes=require('./api/seeker')
 app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use('/',seekerRoutes)


app.listen(PORT,(res)=>{
console.log(`Seeker Auth Server running in the port ${PORT}`);
});
