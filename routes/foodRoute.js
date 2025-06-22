import express from "express";
import {addFood,listFood, removeFood} from "../controller/foodController.js";
import multer from "multer";// this is used for image storing system

const foodRouter = express.Router(); // of this router we can create the get,post,patch or other method




// Image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
 

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)





export default foodRouter;
