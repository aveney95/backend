const Controller = require("../controllers/toDoController")
const User = require("../controllers/userController")
const Middleware = require("../middleware/middleware")

module.exports = (app) => { 
        app.get("/gettodos", Controller.gettodos)
        app.post("/create", Controller.create)
        app.delete("/delete/:id", Controller.delete)
        app.put("/edit/:id", Controller.edit)
        app.post('/register', User.register)
        app.post("/login", User.login)
        app.get("/authCheck", Middleware, User.authCheck)


}