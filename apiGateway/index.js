const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const app=express()
const cors=require('cors')
const proxy=require('express-http-proxy')
const cookieParser=require('cookie-parser')
const PORT=process.env.PORT
 
app.use(cors({
origin:true,
credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use('/seeker',proxy('http://localhost:4001'))
app.use('/employer',proxy('http://localhost:4002'))
app.use('/posts',proxy('http://localhost:4003'))
app.use('/applications',proxy('http://localhost:4004'))
app.use('/chat',proxy('http://localhost:4006'))

app.listen(PORT,(res)=>{
    
console.log(`Gate way port running at ${PORT}`)
})              