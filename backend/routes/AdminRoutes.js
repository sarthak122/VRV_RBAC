import express from 'express';
import { changeUserRole, changeUserStatus, deleteUser, getAllUsers } from '../controllers/Admin.js';
import { isAdmin } from '../middleware/verifyToken.js';



const AdminRoutes=express.Router();

AdminRoutes.get('/getusers',isAdmin,getAllUsers);
AdminRoutes.delete('/delete/:id',isAdmin,deleteUser);
AdminRoutes.put('/:id/status',isAdmin,changeUserStatus);
AdminRoutes.put('/:id/role',isAdmin,changeUserRole);

export default AdminRoutes;