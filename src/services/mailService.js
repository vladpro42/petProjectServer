import * as dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: +process.env.SMPT_PORT,
            host: process.env.SMPT_HOST,
            secure: false, // read about it
            secureConnection: false,
            auth: {
                user: process.env.SMPT_USER,
                pass: process.env.SMPT_PASSWORD,
            },
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMPT_USER,
            to,
            subject: "Активация аккаунта" + process.env.API_URL,
            text: "",
            html: `
            <div>
                <h1>Для активации перейдите по ссылке</h1>
                <a href="${link}">${link}</a>
            </div>`
        })
    }
}

export default new MailService();