import { User } from "../models/User.js";
import bcrypt from "bcrypt"
import * as uuid from "uuid";
import mailService from "./mailService.js";
import tokenService from "./tokenService.js";
import UserDto from "../dtos/userDto.js";
import APIError from "../exseptions/APIError.js"

class AuthService {
    async registration(email, password) {
        const candidate = await User.findOne({ where: { email: email } });

        if (candidate) {
            throw APIError.BadRequest(`Пользователь с таким email ${email} уже существует`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await User.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async activate(activationLink) {
        const user = await User.findOne({ where: { activationLink } })
        if (!user) {
            throw APIError.BadRequest("В бд нет пользователя с такой ссылкой")
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            throw APIError.BadRequest("Пользователь с таким емаил не найден")
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw APIError.BadRequest("Неверный пароль")
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {

        if (!refreshToken) {
            throw APIError.UnAuthorizedError();
        }
        const userData = await tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw APIError.UnAuthorizedError();
        }

        const user = await User.findByPk(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
}

export default new AuthService();