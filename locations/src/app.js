const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const app=express()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const locations=require('./services/location')
const PORT=process.env.PORT
app.use(cors({
    origin:true,
    credentials:true    
}))
app.use(cookieParser())
app.use(express.json())
app.use('/',locations)


   

app.listen(PORT,(res)=>{
console.log(`Location Database   server  running in the port ${PORT}`)
})