const nodemailer = require("nodemailer")

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        })
    }

    async sendActivetionMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Account activation on " + process.env.API_URL,
            text: "",
            html: `
                <div>
                    <h1>To activate, go to the link</h1>
                    <a href="${link}">${link}</a>
                </div>
            `,
        })
    }
}

module.exports = new MailService()
