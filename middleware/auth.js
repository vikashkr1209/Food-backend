import jwt from "jsonwebtoken"

const authMiddleware = async (res,req,resizeBy,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }

    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET || "default_secret");
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}


export default authMiddleware;