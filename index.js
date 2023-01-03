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
            user: 'hitesh19426@iiitd.ac.in',
            pass: process.env.PASSWORD,
        }
    })

    let mailOptions = {
        from: 'hitesh19426@iiitd.ac.in',
        to: 'hitesh19426@iiitd.ac.in',
        subject: 'Test nodemailer',
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