import jwt from "jsonwebtoken"
import Token from "../models/Token.js"

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: "30m" }
        )

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET_KEY,
            { expiresIn: "30d" }
        )

        return {
            accessToken, refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({ where: userId });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save()
        }

        const token = await Token.create({ userId, refreshToken })
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({ where: { refreshToken } })
        return tokenData
    }

    async validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
            return userData
        } catch (error) {
            return null
        }
    }

    async validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
            return userData
        } catch (error) {
            return null
        }
    }

    async findToken(refreshToken) {
        const token = await Token.findOne({ where: { refreshToken } });
        return token;
    }
}

export default new TokenService();