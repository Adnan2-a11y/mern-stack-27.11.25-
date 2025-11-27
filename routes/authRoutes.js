import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post('/register' ,async (req , res) => {
    const { name,email,password } = req.body;
    try{
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exist - chose another email" });

        user = new User({ name, email, password });
        await user.save();

        const payload = { user: { id: user.id } };
        const token =jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({token});
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server error – something went wrong on our end.');
    }
});
export default router;