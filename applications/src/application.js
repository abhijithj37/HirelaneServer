const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const app = express()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const applications=require('./api/applications')
const PORT=process.env.PORT
const internals=require('./api/internal')
const { verifyService } = require('./utils/auth')
app.use(cors({
    origin:true,
    credentials:true    
}))
app.use(cookieParser())
app.use(express.json())
app.use('/internal',verifyService,internals)
app.use('/',applications)

app.listen(PORT,(res)=>{
console.log(`Application  server  running in the port ${PORT} `)
})                             