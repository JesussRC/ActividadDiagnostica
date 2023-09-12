//Dependecias requeridas
import {Cliente} from '../Models'
import{Clientes} from '../Interfaces'
import { Request, Response } from 'express'
import { body } from 'express-validator';

//Controlador para obtener clientes
const obtenerClientes = async(req: Request, res:Response)=>{
    const { Limite = 10, Desde = 0} = req.query
    const query = {Estado:true};
    //modificao
    const [total, clientes] :[Number, Clientes[]]= await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
        .skip(Number(Desde))
        .limit(Number(Limite))
    ])

    res.json({
        total,
        //modificao
        clientes
    })
}

//Controlador para obtener un solo cliente
const obtenerCliente = async (req: Request,res:Response)=>{
    const CLIENTE_ID = req.params;
    const cliente: Clientes|null = (await Cliente.findOne(CLIENTE_ID)); 
        if(!cliente){
            
            return res.status(400).json({status:'No es una ID valida >:c'})
        }
    res.json(cliente);
}


//Controlador para crear clientes
const crearCliente = async(req: Request, res:Response)=>{
    const{Estado,...body} = req.body as Clientes;
    const ClienteExiste = await Cliente.findOne({CLIENTE_NOMBRE:body.CLIENTE_NOMBRE});
    if(ClienteExiste)
    {
        return res.status(400).json({
            message:`El Cliente con ese nombre ya existe ${ClienteExiste.CLIENTE_NOMBRE}`
        })
    }
    const cliente = new Cliente(body);
    const ClienteNuevo = await cliente.save();
    return res.status(201).json(ClienteNuevo);
}


//Controlador para actualizar datos especificos de clientes
const actualizarCliente = async (req:Request,res:Response)=>{
    const id = req.params;
    const {Estado, ...body} = req.body as Clientes;
    const ClienteModificado = await Cliente.findOneAndUpdate(id, body, { new:true }).catch((err)=>{res.status(400).json({status: 'No es una ID valida >:c'})});
    res.json(ClienteModificado);
}


//Controlador para borrar clientes
const borrarCliente = async (req:Request,res:Response)=>{
    const id  = req.params;
    const ClienteBorrado = await Cliente.findOneAndUpdate(id, {Estado:false}, {new:true}).catch((err)=>{res.status(400).json({status:'No es una ID valida >:c', error:err})});
    res.json(ClienteBorrado);
}

//Controlador para recuperar clientes
const recuperarCliente = async (req:Request,res:Response)=>{
    const id  = req.params;
    const ClienteBorrado = await Cliente.findOneAndUpdate(id, {Estado:true}, {new:true}).catch((err)=>{res.status(400).json({status:'No es una ID valida >:c', error:err})});
    res.json(ClienteBorrado);
}

//exportación de controladores desarrollados
export{
    obtenerClientes,
    obtenerCliente, 
    crearCliente,
    actualizarCliente,
    borrarCliente,
    recuperarCliente


}