

const logger = (req, res, next) => {
    console.log("logger hit", req.ip, req.rawHeaders)
    next()
}

module.exports = logger