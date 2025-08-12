import { findClienteByEmailModel } from "../src/models/clientes.model.js";

export const createUserMiddleware = async (req, res, next) => {
    try {
        const {email} = req.body

        if(!email){
            return res.status(400).json({ message: 'El correo electronico es obligatorio'})
        }
        const user = await findClienteByEmailModel(email)
        if(user){
            return res.status(400).json({ message: 'El correo electronico ya existe'})
        }
        next()
    } catch (error) {
        console.error(error)
        res.status(400).json({ message: 'Hubo un problema al procesar la solicitud'})
    }
}