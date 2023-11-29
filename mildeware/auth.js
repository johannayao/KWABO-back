const Jwb = require("jsonwebtoken");
 const veriFyToken = (req,res,next)=>{
    try {
        const tokenDecode = Jwb.verify(req.headers.authorization.split(" ")[1],'RANDOM_TOKEN_SECRET');
        req.auth= {
            _id: tokenDecode._id,email:tokenDecode.email
        };
        next();
    } catch (error) {
        console.log(error.message);
        res.status(404).json({message:"connexion impossible"})
    }
 }

 module.exports= veriFyToken;