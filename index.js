const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
    const { company, email, name, phone, requirements } = req.body;
    const transporter = nodemailer.createTransport({
        host: 's1.stellarsolutions.md',
        port: 587,
        auth: {
            user: 'contact@stellarsolutions.md',
            pass: '8FdjLBbgzP',
        },
    });

    const mailOptions = {
        from: 'your-email@example.com',
        to: 'contact@stellarsolutions.md',
        subject: 'Mail nou: stellarsolutions.md',
        text: `Numele/Prenumele: ${name}\nCompania: ${company}\nEmail: ${email}\nNumărul de telefon: ${phone}\nMesaj:\n\n${requirements}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent');
        }
    });
});

app.listen(8888, () => {
    console.log(`Server running at 8888`);
});
