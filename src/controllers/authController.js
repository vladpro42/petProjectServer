import { Op } from "sequelize";
import { User } from "../models/User.js";
import CryptoJS from "crypto-js";
import config from "../../config.js";
import { generateAccesssToken } from "../utils/utils.js"


class AuthController {

    async login(req, res) {

        try {
            const { login, email, password } = req.body;

            const userSignIn = login || email;

            if (!userSignIn) {
                return res.status(400).json({ message: "Некоректный логин или емайл" })
            }

            const candidate = await User.findAll({
                where: {
                    [Op.or]: [
                        { login: userSignIn },
                        { email: userSignIn }
                    ]
                }
            })

            if (!candidate.length) {
                return res.status(400).json({ message: "Пользователь не найден" })
            }
            const [user] = candidate
            const bytes = CryptoJS.AES.decrypt(user.dataValues.password, config.secret2);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

            if (originalPassword !== password) {
                return res.status(400).json({ message: "неправильный логи или пароль" })
            }

            const token = generateAccesssToken(candidate.id)
            res.json({ token })

        } catch (error) {
            res.status(400).json({ error: error })
        }

    }
}



export default new AuthController();