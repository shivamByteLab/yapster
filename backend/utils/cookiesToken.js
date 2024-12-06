import getToken from "../helper/getJwtToken.js";

const cookieToken =(user,res) => {
    const token = getToken(user.id);
    const optons = {
        expires :new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly:true,
        sameSite:"lax",
        secure: process.env.NODE_ENV !== 'development'
    };
    user.password = undefined;
    res.status(200).cookie('token',token,optons).json({
        succes:true,
        token,
        user
    })
}

export default cookieToken;