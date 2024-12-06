import pkg from 'jsonwebtoken'

const {sign} = pkg

const getToken =(userId)=>{
    return sign({userId:userId},process.env.JWT_SECRET,{expiresIn:'30 day'})
}


export default getToken