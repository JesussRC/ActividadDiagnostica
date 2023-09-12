//                    ******Importacion de las dependecias******
import './style.css'
import swal from 'sweetalert';
import {consul, guarda} from './controllers/clientes'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML += `
<h1>Registro de Clientes</h1>
<label for='id' >ID </label><input readonly="readonly" type="text" id='id' />

<label for='CLIENTE_ID' >Cliente ID </label><input id='CLIENTE_ID' />
<br>
<br>
<label for='CLIENTE_NOMBRE' >Nombre </label><input id='CLIENTE_NOMBRE' />
<br>
<br>
<label for='CLIENTE_CEDULA' >Cedula </label><input id='CLIENTE_CEDULA' />
<br>
<br>
<label for='CLIENTE_TELEFONO' >Telefono </label><input id='CLIENTE_TELEFONO' />
<br>
<br>
<label for='Estado' >Estado </label><input id='Estado' />
<br>
<br>

<button id="nuevo">Limpiar</button>
<button id="grabar">Guardar</button>
<button id="consultar">Consultar</button>

<div id="cuerpo" />
`

const id = document.querySelector<HTMLInputElement>('#id')!
const cliente_id = document.querySelector<HTMLInputElement>('#CLIENTE_ID')!
const cliente_nombre = document.querySelector<HTMLInputElement>('#CLIENTE_NOMBRE')!
const cliente_cedula = document.querySelector<HTMLInputElement>('#CLIENTE_CEDULA')!
const cliente_telefono = document.querySelector<HTMLInputElement>('#CLIENTE_TELEFONO')!
const estado = document.querySelector<HTMLInputElement>('#Estado')!


const nuevo = document.querySelector<HTMLButtonElement>("#nuevo")!
const grabar = document.querySelector<HTMLButtonElement>("#grabar")!
const consultar = document.querySelector<HTMLButtonElement>("#consultar")!

const cuerpo = document.querySelector<HTMLDivElement>('#cuerpo')!


nuevo.addEventListener('click', () =>{
  id.value=""
  cliente_id.value=""
  cliente_nombre.value=""
  cliente_cedula.value=""
  cliente_telefono.value=""
  estado.value=""
  swal("Limpieza correcta", "Se han limpiado los campos del formulario", "success");
})
//        **********Para consulta general********* 
consultar.addEventListener('click', async()=>{
 consul();
})



grabar.addEventListener('click', async()=>{
guarda();
})

export {id, cliente_id, cliente_nombre, cliente_cedula, cliente_telefono, estado, cuerpo}