const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const htmlToText = require("html-to-text");
const { promisify } = require("util");

const Transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

exports.send = async (options) => {
    const sendOptions = {
        from: `Vivek Bariya <noreply@vb.com>`,
        to: options.user.email,
        subject: options.subject,
        html: "Filled Later",
        text: "Filled Later",
    };
    const sendMail = promisify(Transport.sendMail).bind(Transport);
    return sendMail(sendOptions);
};
