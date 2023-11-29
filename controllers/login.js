const Users = require("../models/user.js");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken")
class LoginControllers{
    static async login(req, res){
        try {
            const isUser = await Users.findOne({email:req.body.email});
            if(!isUser) return res.status(203).json({message :"l'email ou mot de passe incorrecte"});
            const hashage = await bcrypt.compare(req.body.passwords, isUser.passwords);
            if(!hashage) return res.status(203).json({message :"l'email ou mot de passe incorrecte"});
            const token = Jwt.sign({ _id: isUser._id, email:isUser.email }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
            console.log(token);
            return res.status(201).json({ message: 'mot de passe correcte', token: `token ${token}` });
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"une erreur s'est produite lors de l'enregistrement", error: error.message})
        }
    }
}
module.exports = LoginControllers;