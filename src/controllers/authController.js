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
        try {
            const id = req.params.id

            const [user] = await User.findAll({ where: { id } })

            if (!user) {
                res.status(400).json({ message: "Пользователь не найден" })
                return
            }

            res.json(user.dataValues)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

    }

    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async updateUser(req, res) {
        try {
            const { login, email } = req.body;

            if (!email) {
                res.status(400).json({ message: "Некоректный email" })
            }

            const [user] = await User.findAll({ where: { email: email } })

            user.dataValues.login = login

            await user.save();

            res.json(user)

        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id

            const [user] = await User.findAll({ where: { id } })

            if (!user) {
                res.status(400).json({ message: "Пользователь не найден" });
                return
            }
            await user.destroy();
            res.json(user.dataValues);
        } catch (error) {
            res.status(400).json({ message: error.message })
        }

    }

}

export default new AuthController();