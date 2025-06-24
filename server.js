import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from './routes/cartRoute.js'






// app config

const app  = express()
const port = 44444;

// middleware
app.use(express.json()) // it use when ..we want request from frontend to backend
app.use(cors({
  origin: "https://deploy-mern-1whq.vercel.app", // Your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
})); // bcz of this we can access backend from frontend
//  db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)


app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

