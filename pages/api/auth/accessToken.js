import connectDb from "../../../utils/db";
import Users from '../../../models/User'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'
import jwt from 'jsonwebtoken'

connectDb()

export default async (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken
        if(!rf_token) return res.status(400).json({err:'Login Now!'})
        const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
        if(!result) return res.status(400).json({err:'Incorrect tokennnn or  it has expiredd!!'})
        const user  = await Users.findById(result.id)   
        if(!user) return res.status(400).json({err:'This user does not exist, ok bye!'})
        const access_token = createAccessToken({id: user._id})
        res.json({
            access_token,
            user:{
                userName: user.userName,
                role: user.role,
                approved: user.approved,
                root: user.root
            }
        })
    } catch(err) {
        return res.status(500).json({err:err.message})
    }
}

