const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASSWORD, SMTP_HOST, SMTP_PORT, SMTP_FROM_EMAIL } = require('../configs/config');

const transporter = nodemailer.createTransport(
    {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        }
    },
    {
        from: SMTP_FROM_EMAIL
    }
);

const mailer = massage => {
    transporter.sendMail(massage, (err, info) => {
        if(err) {
            throw new Error(err);
        };
        // eslint-disable-next-line no-console
        console.log(info);
    });
};

module.exports = mailer;
