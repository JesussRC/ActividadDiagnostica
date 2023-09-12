import mongoose  from "mongoose";
import{Schema, model} from "mongoose"
import{Clientes} from '../Interfaces'

//Modelo principal
const ClienteSchema: mongoose.Schema = new Schema<Clientes>({
    CLIENTE_ID:{
        type: Number,
        required: [true,'El ID del cliente es obligatiro'],
        unique: true
    },

    CLIENTE_NOMBRE:{
        type: String,
        required: true
    },
    CLIENTE_CEDULA:{
        type: String,
        required: true
    },
    CLIENTE_TELEFONO:{
        type: String,
        required: true
    },
    Estado: {
        type : Boolean,
        required: true,
        default: true,
    }

})

const Cliente: mongoose.Model<Clientes> = model<Clientes>('Cliente', ClienteSchema);

export{
    Cliente
}