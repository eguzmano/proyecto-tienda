import { findClienteByEmailModel } from "../models/clientes.model.js";

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await findClienteByEmailModel(email)
        if (!user){
            return res.status(404).json({message: "Credenciales Invalidas"})
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid){
            return res.status(401).json({message: 'Credenciales Invalidas'})
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET,{
            expiresIn: '1d'
        })
        console.log(token)
        return res.status(200).json({
            token,
            nombre: user.nombre,
            email: user.email
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
