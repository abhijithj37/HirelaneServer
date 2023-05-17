const multer=require('multer')
module.exports={
 
      storage : multer.diskStorage({
 
        destination: function (req, file, cb) {
           cb(null,'src/uploads')
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now())
        }
      })
 }