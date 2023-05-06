import Jwt from "jsonwebtoken"

function generateAccesssToken(id) {
    const payload = {
        id,
    }

    return Jwt.sign(payload, config.secret, { expiresIn: "24h" })
}

export { generateAccesssToken }