const LoginControllers = require("../controllers/login");
const express = require("express");
const RouterLogin = express.Router();
RouterLogin.post("/connexion", LoginControllers.login);
module.exports = RouterLogin;

