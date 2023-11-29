// const bcrypt = require('bcrypt');
// // //on importe notre models userShema
//  const Users = require("../models/user.js");
//  const Jwt = require("jsonwebtoken");



//   exports.inscription = async (req, res) => {
//     try {
//       if (req.body.password !== req.body.cpassword) {

//         return res.status(401).json({ message: "Les mots de passe ne correspondent pas" });
//       }
     
//       console.log(req.body.password);
//       console.log(req.body);
      
//       const existingUser = await Users.findOne({ email: req.body.email });
//       if (existingUser) {
//         return res.status(300).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà' });
//       }
   
//       const saltRounds = 10;
//       const hash = await bcrypt.hash(req.body.password, saltRounds);
//       req.body.password = hash;

//       const newUser = await Users.create(req.body);
//       res.status(200).json({ message: 'Utilisateur créé avec succès' });
    
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur' });
//     }
//   };


//  exports.connexion = (req, res, next) => {
//    Users.findOne({ email: req.body.email })
//      .then(newUser => {
//        console.log(req.body);
//          if (!newUser) {
//            return res.status(200).json({ message: 'mot de passe incorrecte' });
//          }
//         Utilisez bcrypt.compare pour comparer le mot de passe fourni avec le mot de passe haché dans la base de données
//        bcrypt.compare(req.body.password, newUser.password)
//          .then(avalid => {
//            if (avalid) {
//              const token = Jwt.sign(
//                { newUserId: newUser._id },
//                'RANDOM_TOKEN_SECRET',
//                { expiresIn: '24h' }
              
//             //    Corrigez la faute de frappe ici : 'expiresIn'
              
//              );
//              return res.status(201).json({ message: 'mot de passe correcte', token });
//            }else{
//              return res.status(401).json({ message: 'mot de passe incorrecte' });
//            }
//          })
//          .catch(error => {
//            console.log(error)
//            res.status(400).json({ message:'not founds' })
//          });
//      })
//      .catch(error => {
//        console.log(error)
//            res.status(500).json({ message:'not founds' })
//      });
//  };




const bcrypt = require('bcrypt');
//on importe notre models userShema
 const Users = require("../models/user.js");
 const Jwt = require("jsonwebtoken");
 
  exports.inscription = async (req, res) => {
     try {
         if (req.body.password !== req.body.cpassword)  return res.status(401).json({ message: "Les mots de passe ne correspondent pas" });
         const existingUser = await Users.findOne({ email: req.body.email });
         console.log(req.body );
    
         if (existingUser) return res.status(300).json({ message: 'Un utilisateur avec cette adresse e-mail existe déjà' });
         req.body.password = await bcrypt.hash(req.body.password, 10);
         const newUser = await Users.create(req.body);
         res.status(200).json({ message: 'Utilisateur créé avec succès', data: newUser });
     } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur' });
         console.log(error);
     }

  };

// papa
 exports.connexion = async (req, res) => {
     try {
         const isUser = await Users.findOne({ email: req.body.email })
         if (!isUser) return res.status(200).json({ message: 'Email incorrect' });
         const isPassword = await bcrypt.compare(req.body.password, isUser.password);
         if(!isPassword) return res.status(200).json({ message: 'Mot de passe incorrect' });
         const token = Jwt.sign( { userId: isUser._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' } );
         return res.status(201).json({ message: 'mot de passe correcte', data: token });
     }
     
      catch (error) {
         res.status(500).json({ message:'not founds' })
     }
 };
