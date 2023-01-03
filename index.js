const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const cors = require('cors')
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send("Welcome to root URL of Server");
});

app.post('/test', async (req, res) => {
    let {name, mobile, message, mail} = req.body;
    
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    })

    let mailOptions = {
        from: process.env.EMAIL,
        to: 'info@redpositive.in',
        subject: 'React Native Intern Task',
        text: "name: " + name + "\nmobile: " + mobile + "\nmessage: " + message + "\nmail: " + mail,
    }

    mailTransporter.sendMail(mailOptions, (err) => {
        if(err){
            console.log("err = ", err);
            res.status(400).send("Error");
        }else{
            console.log('Mail has been sent successfully');
            mailTransporter.close();
            res.status(200).send("Success");
        }
    });
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);