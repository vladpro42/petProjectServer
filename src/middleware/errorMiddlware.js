import APIError from "../exseptions/APIError.js";

const errorMidlware = (err, req, res, next) => {

    if (err instanceof APIError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }

    res.status(500).json({ message: "Непридвиденная ошибка", err: err });
}

export { errorMidlware }