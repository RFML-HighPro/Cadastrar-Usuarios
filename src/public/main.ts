import AccountController from "../controller/account.controller"
import UserController from "../controller/user.controller"
import { AppDataSource } from "../database/data-source"
import express from "express"

AppDataSource.initialize().then(() => {
    const app = express()
    app.use(express.json())
    app.use("/api/user", UserController)
    app.use("/api/account", AccountController)
    return app.listen(process.env.SERVER_PORT)
})
