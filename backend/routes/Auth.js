import express from 'express';
import { login, logout, register } from '../controllers/Auth.js';
// import {IsUser} from '../middleware/verifyToken.js'
const AuthRoutes=express.Router();

AuthRoutes.post('/register',register);
AuthRoutes.post('/login',login);
AuthRoutes.get('/logout',logout);
// AuthRoutes.get('/CheckUser',IsUser,CheckUser)

export default AuthRoutes;