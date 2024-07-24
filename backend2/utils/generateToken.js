import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId,res)=>{
    if(!userId || !res){
        throw new Error("userId or res is Null")
    }
    const token = jwt.sign(userId,process.env.JWT_SECRET_KEY,{
        expiresIn:"15d"
    })

    res.cookie('jwt',token,{
        maxAge:15 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict"
    })
}

export default generateTokenAndSetCookie;