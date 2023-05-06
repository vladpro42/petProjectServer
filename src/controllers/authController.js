import { User } from "../models/User.js";
import CryptoJS from "crypto-js";


class AuthController {
    async createUser(req, res) {

        try {
            const { email, login, password } = req.body;

            const candidate = await User.findAll({
                where: {
                    email,
                    login,
                }
            })

            if (candidate.length) {
                res.status(400).json({ message: "Пользователь с тиким email или login уже существует" })
                return;
            }


            let encryptedPassword = CryptoJS.AES.encrypt(password, "secret key 123").toString();

            //var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
            //var originalText = bytes.toString(CryptoJS.enc.Utf8);

            const person = await User.create({
                email,
                login,
                password: encryptedPassword,
            });

            res.status(200).json({ message: "Пользователь успешно зарегестрирован" })

        } catch (error) {

            res.status(400).json({ message: "Registration error" })
        }

    }

    async getUser(req, res) {

    }

    getUsers(req, res) {
    }

    updateUser(req, res) {

    }

    deleteUser(req, res) {

    }

}

export default new AuthController();