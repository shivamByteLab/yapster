import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'


import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from "./routes/messageRoutes.js"
import createGroup from './routes/createGroupRoute.js'
import groupRoutes from './routes/groupRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000



dotenv.config();


import cors from "cors";
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow credentials (cookies)
  }));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())




app.use('/api/auth/',authRoutes)
app.use('/api/user/',userRoutes)
app.use("/api/",messageRoutes)
app.use("/api/create-group/",createGroup)
app.use("/api/",groupRoutes)

app.get('/',(req,res)=>{
    res.status(200).json("hello world!")
})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})