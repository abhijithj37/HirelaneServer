const mongoose=require('mongoose')
const db=require('../connection')

const notificationSchema=new mongoose.Schema({
    from:String,
    to:String,
    content:String,
    read:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
module.exports={
    Notifications:db.model('notification',notificationSchema)
}