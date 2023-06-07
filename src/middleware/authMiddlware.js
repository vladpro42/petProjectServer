import APIError from "../exseptions/APIError.js";
import tokenService from "../services/tokenService.js";

export default async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(APIError.UnAuthorizedError());
        }

        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return next(APIError.UnAuthorizedError());
        }

        const userData = await tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(APIError.UnAuthorizedError());
        }

        req.user = userData;
        next()
    } catch (error) {
        return next(APIError.UnAuthorizedError());
    }
}