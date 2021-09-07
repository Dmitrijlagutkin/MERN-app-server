require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const authRoutes = require("./router/auth-routes")
const listRoutes = require("./router/list-routes")
const listItemRoutes = require("./router/listItem-routes")
const errorMiddleware = require("./middlewares/error-middleware")
const ApiError = require("./exceptions/api-error")

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api", authRoutes, listRoutes, listItemRoutes)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
    } catch (e) {
        console.log("at index.js", e)
    }
}

start()
