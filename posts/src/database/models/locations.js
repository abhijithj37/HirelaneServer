const mongoose=require('mongoose')
const db=require('../connection')

const locationSchema=new mongoose.Schema({
    city:String,
    state:String
})

module.exports={
    locations:db.model('locations',locationSchema)
}