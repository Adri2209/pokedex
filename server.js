import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/useroutes.js"
import cors from "cors"
import session from "express-session"
import "dotenv/config"

const db = process.env.BDD_URL
const app = express()
const router = express.Router()

app.use(session({secret: process.env.SECRET_KEY,saveUninitialized: true,resave: true}));
app.use(cors())
app.use(express.static("./assets"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)
router.use(userRouter)

app.listen(process.env.PORT,(error)=> {
    if (error) {
      console.log("error");  
    }else{
        console.log(`Connected at ${process.env.APP_URL}`);
    }
})
mongoose.connect(db, function(error){
    if (error) {
        console.log("error");  
      }else{
          console.log("connected to database mongodb (en mode réussite.....)");
      }
})

export default router
