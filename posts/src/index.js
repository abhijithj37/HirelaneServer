const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const app = express()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const posts=require('./api/post') 
const PORT=process.env.PORT
app.use(cors({

    origin:true,
    credentials:true    

}))
app.use(cookieParser())
app.use(express.json())
app.use('/',posts)    

app.listen(PORT,(res)=>{
console.log(`Job Post server running in the port ${PORT}`)
})