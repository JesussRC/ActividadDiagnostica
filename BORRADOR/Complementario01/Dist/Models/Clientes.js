"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const mongoose_1 = require("mongoose");
//Modelo principal
const ClienteSchema = new mongoose_1.Schema({
    CLIENTE_ID: {
        type: Number,
        required: [true, 'El ID del cliente es obligatiro'],
        unique: true
    },
    CLIENTE_NOMBRE: {
        type: String,
        required: true
    },
    CLIENTE_CEDULA: {
        type: String,
        required: true
    },
    CLIENTE_TELEFONO: {
        type: String,
        required: true
    },
    Estado: {
        type: Boolean,
        required: true,
        default: true,
    }
});
const Cliente = (0, mongoose_1.model)('Cliente', ClienteSchema);
exports.Cliente = Cliente;
