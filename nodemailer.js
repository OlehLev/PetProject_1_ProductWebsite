const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'vida.wyman92@ethereal.email',
            pass: '4fee4ybXqyH5U7wTMP'
        }
    },
    {
        from: 'vida.wyman92@ethereal.email'
    }
);

const mailer = massage => {
    transporter.sendMail(massage, (err, info) => {
        if(err) {
            return console.warn(err);
        };
        console.log(info);
    });
};

module.exports = mailer;
