const nodemailer = require('nodemailer');
const { variables: { noReplyEmail, noReplyPassword } } = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: noReplyEmail,
        pass: noReplyPassword
    }
});

const sendMail = (userMail) => {
    console.log(2);
    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: ' hello word',
        html: '<h1> Body email</h1>'

    });
};

module.exports = {
    sendMail
};
