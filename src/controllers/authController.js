import userService from "../services/authService.js";
import { validationResult } from "express-validator";
import APIError from "../exseptions/APIError.js";
import authService from "../services/authService.js";


class AuthController {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(APIError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await authService.login(email, password);
            //res.header ("Access-Control-Allow-Credentials", true);
            res.cookie("refresToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken)
            res.clearCookie("refreshToken");
            return res.json(token)
        } catch (error) {
            next(error)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req, res) {
        try {
            return res.json([1, 2, 4])

        } catch (error) {
            return res.json("Ошибка")
        }
    }

    async checkToken(req, res, next) {
        try {
            const token = req.params.token;
            const userData = validateAccessToken(token);
            res.json({ message: "Token is valid", valid: userData })
        } catch (error) {
            next(error)
        }
    }

}



export default new AuthController();