import chatbotModel from "../models/chatbotModel.js";
import nodemailer from "nodemailer"

const mailTemplate = (email, name, phone, msg) => `    
<html>
<head>
</head>
<body>
    <div>
        <h1>New Message from Chatbot</h1>
        <p>
            <strong>Email:</strong> ${email}
        </p>
        <p>
            <strong>Name:</strong> ${name}
        </p>
        <p>
            <strong>Phone:</strong> ${phone}
        </p>
        <p>
            <strong>Message:</strong> ${msg}
        </p>

    </div>
</body>
</html>
`

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',                  // hostname
    service: 'outlook',                             // service name
    secureConnection: false,
    tls: {
        ciphers: 'SSLv3'                            // tls version
    },
    port: 587,                                      // port
    auth: {
        user: "oliver.andersson@live.com",
        pass: process.env.OUTLOOK_PASSWORD
    }
});

async function sendMail(emailTo, email, name, phone, msg) {

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'oliver.andersson@live.com', // sender address
        to: emailTo, // list of receivers
        subject: "New Message from Chatbot", // Subject line
        text: "New Message from Chatbot", // plain text body
        html: mailTemplate(email, name, phone, msg), // html body
    });

    console.log("Mail sent")

}

export default { sendMail }