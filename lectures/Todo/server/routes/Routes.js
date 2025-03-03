const Controller = require("../controllers/Controllers")
const logger = require("../middleware/logger")

module.exports = (app) => {
    app.get("/getToDos", logger, Controller.getToDos)

    app.post("/create", Controller.create)

    app.delete("/delete/:id", Controller.delete)

    app.get("/test", Controller.test)
}