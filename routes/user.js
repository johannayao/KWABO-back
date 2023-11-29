const express= require('express')
const routerUser = express.Router()

const ControllerUser = require('../controllers/users.js')                          
routerUser.post('/inscription',ControllerUser.inscription);
routerUser.post('/connexion',ControllerUser.connexion);


module.exports = routerUser