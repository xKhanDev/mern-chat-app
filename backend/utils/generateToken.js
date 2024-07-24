import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
    if (!userId || !res) {
        throw new Error('userId or res is null');
    }

    const token = jwt.sign(userId, process.env.JWT_SECRET_KEY, {
        expiresIn: "15d"
    });

    res.cookie("jwt", token, {
        httpOnly: true,  // prevent cross-site scripting attack
        maxAge: 15 * 24 * 60 * 60 * 1000,     // 15 days in milliseconds
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict"  // prevent cross-site request forgery
    });
}

export default generateTokenAndSetCookies;