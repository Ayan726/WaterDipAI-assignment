const { StatusCodes } = require("http-status-codes")

const notFoundMiddleware = (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({ status: false, error: "content not found!!"})
}

module.exports = notFoundMiddleware