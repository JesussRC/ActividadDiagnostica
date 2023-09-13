import {Router} from 'express'
import {check} from 'express-validator'
import { Trabajador } from '../Controllers/Index'

const { obtenerTrabajador, obtenerTrabajadores, crearTrabajador, actualizarTrabajador, borrarTrabajador} = Trabajador;

const router = Router()

router.get('/' , obtenerTrabajadores)
router.get('/:TRABAJADOR_ID', obtenerTrabajador)
router.post('/', [check('TRABAJADOR_CEDULA', 'El ingreso del id del espacio es obligatorio').not().isEmpty()], crearTrabajador)
router.put('/:TRABAJADOR_ID', actualizarTrabajador)
router.delete('/:TRABAJADOR_ID', borrarTrabajador)

export{router}