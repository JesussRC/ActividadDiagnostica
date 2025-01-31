"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Index_1 = require("../Controllers/Index");
const Index_2 = require("../Middlewares/Index");
const { ObtenerEspacios, ObtenerEspacio, CrearEspacio, ActualizarEspacio, BorrarEspacio } = Index_1.Espacio;
const router = (0, express_1.Router)();
exports.router = router;
const { validarCampos, validarRepetidoEspacios } = Index_2.funciones;
router.get('/', ObtenerEspacios);
router.get('/:ESPACIO_ID', ObtenerEspacio);
router.post('/', [(0, express_validator_1.check)('ESPACIO_ID', 'El ID del espacio es obligatorio y no se puede repetir').not().isEmpty(), validarCampos, validarRepetidoEspacios], [(0, express_validator_1.check)('ESPACIO_ESTADO', 'El Estado del espacio es obligatorio').not().isEmpty(), validarCampos], [(0, express_validator_1.check)('ESTABLECIMIENTO_NOMBRE', 'El Nombre del establecimiento que ofrece el espacio es obligatorio').not().isEmpty(), validarCampos], CrearEspacio);
router.put('/:ESPACIO_ID', ActualizarEspacio);
router.delete('/:ESPACIO_ID', BorrarEspacio);
