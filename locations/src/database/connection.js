const mongoose=require('mongoose')
 const db=mongoose.createConnection(process.env.DATABASE_URL)

db.on('error',(err)=>{
    console.error();
})
db.once('open',()=>{
    console.log('Location Database Connection successfull');
})

module.exports=db