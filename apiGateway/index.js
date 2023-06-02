const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const app=express()
const cors=require('cors')
const proxy=require('express-http-proxy')
const cookieParser=require('cookie-parser')
const PORT=process.env.PORT
const SEEKER_SERVICE=process.env.SEEKER_SERVICE
const EMPLOYER_SERVICE=process.env.EMPLOYER_SERVICE
const POST_SERVICE=process.env.POST_SERVICE
const APPLICATION_SERVICE=process.env.APPLICATION_SERVICE
const CHAT_SERVICE=process.env.CHAT_SERVICE
app.use(cors({
origin:true,
credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use('/seeker',proxy(SEEKER_SERVICE))
app.use('/employer',proxy(EMPLOYER_SERVICE))
app.use('/posts',proxy(POST_SERVICE))
app.use('/applications',proxy(APPLICATION_SERVICE))
app.use('/chat',proxy(CHAT_SERVICE))

app.listen(PORT,(res)=>{
    
console.log(`Gate way port running at ${PORT}`)
})              