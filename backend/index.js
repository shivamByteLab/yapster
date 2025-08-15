import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from "cors";


import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from "./routes/messageRoutes.js"
import createGroup from './routes/createGroupRoute.js'
import groupRoutes from './routes/groupRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000



dotenv.config();


// Define dynamic allowed origins
const allowedOrigins = [
    "http://localhost:3000", // Localhost development
    "https://61xqvxr9-3000.inc1.devtunnels.ms", // Dev tunnel for port forwarding
    "https://*.devtunnels.ms", // Wildcard for all Dev Tunnels subdomains
  ];
  

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some((allowed) => origin.includes(allowed))) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: Not allowed by CORS"));
    }
  },
  credentials: true,
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