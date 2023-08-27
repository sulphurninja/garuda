import connectDb from "../../../utils/db";
import Users from '../../../models/User'
import bcrypt from 'bcrypt'

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break;
    }
}



const register = async (req, res) => {
    try {
        const { userName, password, name, email } = req.body

        const passwordHash = await bcrypt.hash(password, 12)

        const user = await Users.findOne({ userName })
        if (user) return res.status(400).json({ err: 'You are already registerd!' })

        const newUser = new Users(
            { userName, password: passwordHash, name, email })

    
        await newUser.save()
        res.json({ msg: "Successful Registration!" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: err.message })

    }
}