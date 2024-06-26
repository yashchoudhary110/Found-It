const nodemailer= require("nodemailer");

const bcrypt= require("bcrypt");
// const User = require("./models/user");

let transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
      user: "raghuvanshiharsh32@gmail.com",
      pass:"udfjwxochwjyonut",
  },
  tls: {
      rejectUnauthorized: false
  }
});
transporter.verify((error,success)=>{
  if(error){
      console.log(error);
  } else {
      console.log("Ready for Message");
      console.log(success);
  }
})

const sendEmail = async (v_link, email) => {
  // Configure API key authorization: api-key
  try {
   
    const mailoption ={
       from : "raghuvanshiharsh32@gmail.com",
       to :email,
       subject : "Verify Your Email",
       html : `<p>Click on given below Link to verify your email id</p>
       //     <a href=${v_link}>Verify Your Email</a>`
    };

   
     transporter.sendMail(mailoption);

 
   } catch (err){
       console.log(err);
       // res.json({
       //     status: "failed",
       //     message : err.message,

       // });
     let  message = err.message;

     

   }
}











// // Import the SibApiV3Sdk library
// var SibApiV3Sdk = require('sib-api-v3-sdk');

// // Get the default API client instance
// var defaultClient = SibApiV3Sdk.ApiClient.instance;

// // Define a function to send an email
// const sendEmail = (v_link, email) => {
//   // Configure API key authorization: api-key
//   var apiKey = defaultClient.authentications['api-key'];
  
//   // Set the API key from an environment variable
//   apiKey.apiKey = process.env.SIBAPIKEY;
  
//   // Create an instance of the TransactionalEmailsApi class
//   var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//   // Define the sender's email and name
//   const sender = {
//     email: process.env.USER,  // Sender's email from environment variable
//     name: process.env.COMPANY,  // Sender's name from environment variable
//   }

//   // Define the receivers' information
//   const receivers = [
//     {
//       email: email,  // Receiver's email passed as an argument
//     },
//   ]

//   // Call the sendTransacEmail function to send the email
//   apiInstance.sendTransacEmail({
//     sender,
//     to: receivers,
//     subject: 'Verify Your Email',  // Email subject
//     textContent: `
//     Cules Coding will teach you how to become {{params.role}} a developer.
//     `,  // Text content of the email
//     htmlContent: `<p>Click on given below Link to verify your email id</p>
//     <a href=${v_link}>Verify Your Email</a>`,  // HTML content of the email
//     params: {
//       role: 'Frontend',  // Parameter used in the email template
//     }, 
//   })
//     .then(console.log)  // Log success response  
//     .catch((error) => {
//       console.log(error.message);  // Log error message
//     });
// }

// // Export the sendEmail function to be used in other modules
module.exports = sendEmail;
