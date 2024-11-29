import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import AuthRoutes from "./routes/Auth.js"
import AdminRoutes from "./routes/AdminRoutes.js"
dotenv.config({})
const app = express()

//middleware

app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))
app.use('/api/auth',AuthRoutes)
app.use('/api/admin',AdminRoutes)
// app.use('/api/admin',AdminRoutes)


const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    connectDB()
    console.log(` server listening on ${PORT}`)
})
