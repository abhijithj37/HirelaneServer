const nodemailer=require('nodemailer')
 
let transporter=nodemailer.createTransport({
    host:"smtp-relay.sendinblue.com",
    port:587,
    auth:{
        user:process.env.AUTH_USER,
        pass:process.env.AUTH_PASS
    }
})

transporter.verify((error,success)=>{
if(error){
console.log(error);
}else{
console.log('ready for messages')
}
})

const sendVerificationCode=async(
    toEmail,verificationCode
)=>{
try {
    await transporter.sendMail({
        from:'noreplay@hirelane.com',
        to:toEmail,
        subject:'Hirelane Email Verification',
        html:`<p> This is your verification code<strong> ${verificationCode}</strong></P></br><p>Expires in 10 minutes<p/>`

    })
    return
} catch (error) {
    console.log(error);
    
} 
}

module.exports=sendVerificationCode