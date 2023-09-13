import axios from 'axios';
import swal from 'sweetalert';
import { IResCliente, IClientes } from '../interfaces/ICliente'
import {id, cliente_id, cliente_nombre, cliente_cedula, cliente_telefono, estado, cuerpo} from '../main';
const httpAxios = axios.create({
    baseURL: `http://localhost:2500/v1/sextoa/api/`
  });

const consul = async ()=> {
    const resclientes:IResCliente =await (await httpAxios.get<IResCliente>('clientes')).data
  
    const tabla = document.createElement('table');
    tabla.id="tabla"
    tabla.border="1"
  
    tabla.style.marginTop = "65px";
    tabla.style.marginLeft = "35.5%";
    tabla.style.width = "80 %";
  
    console.log(resclientes);
    const { clientes }=resclientes;
    console.log(clientes);
  
      const row2 = tabla.insertRow();
      const xcelda = row2.insertCell();
      xcelda.innerHTML = `<p>NOMBRE</p>`;
      const xcelda2= row2.insertCell();
      xcelda2.innerHTML=`<p>CÉDULA</p>`;
      const xcelda3= row2.insertCell();
      xcelda3.innerHTML=`<p>TELÉFONO</p>`;
      const xcelda5= row2.insertCell();
      xcelda5.innerHTML=`<p>ELIMINAR CLIENTE</p>`;
  
  
  
    for(const cliente of clientes)
      {
          const row = tabla.insertRow()
          const celda = row.insertCell()
          celda.innerHTML
          =` <button class="boton" value='${ cliente.CLIENTE_ID }'>
          ${cliente.CLIENTE_NOMBRE} </button>`;
  
          const celda2= row.insertCell()
          celda2.innerHTML=`${cliente.CLIENTE_CEDULA}`
          const celda3= row.insertCell()
          celda3.innerHTML=`${cliente.CLIENTE_TELEFONO}`
          const celda5= row.insertCell();
          celda5.innerHTML=`<button class="botoneliminar" value='${cliente.CLIENTE_ID}'>Eliminar </button>`;
      }
  //             **********Para consulta especifica*************
  
        cuerpo.innerHTML=""
        cuerpo.appendChild(tabla)
        document.querySelectorAll('.boton').forEach((ele: Element) =>{
  
        ele.addEventListener('click', async()=>
        {
            const idcliente= (ele as HTMLButtonElement).value
            const{data} = await httpAxios.get<IClientes>(`clientes/${idcliente}`)
            console.log(data);
            console.log(data.CLIENTE_ID);
            cliente_id.value=data.CLIENTE_ID.toString();
            cliente_nombre.value= data.CLIENTE_NOMBRE;
            cliente_cedula.value= data.CLIENTE_CEDULA;
            cliente_telefono.value=data.CLIENTE_TELEFONO;
            estado.value=data.Estado!.toString();
            id.value=data._id!
  
  
      })
    })
//            **********Metodo Eliminar**********

  document.querySelectorAll('.botoneliminar').forEach( (ele2 : Element )  =>{

    ele2.addEventListener('click',async ()=>
   { 
     const idcliente = (ele2 as HTMLButtonElement ).value;
     console.log(idcliente);
     const {data} = await httpAxios.delete<IClientes>(`clientes/${idcliente}`)
     const eliminado = data
     console.log(data);
     console.log(`Cliente eliminado => ${eliminado.CLIENTE_ID}`);
     swal("Eliminado!", `Cliente eliminado => ${eliminado.CLIENTE_ID}`, "success");
     consul();
   })

 })
};

const guarda = async () => {
    const asignarValores=()=>{
        const data:IClientes = {
          CLIENTE_ID: Number (cliente_id.value),
          CLIENTE_NOMBRE: cliente_nombre.value,
          CLIENTE_CEDULA: cliente_cedula.value,
          CLIENTE_TELEFONO: cliente_telefono.value
        }
        return data;
      }
      const data = asignarValores()
    //            **********Modificar los datos***********
/* ----------------------------- MODIFICACION DE DATOS ------------------------------------- */
if ( id.value.trim().length>0 )
{
   const resclientes:IClientes = await (await httpAxios.put<IClientes>(`clientes/${cliente_id.value}`,data )).data
   console.log(`El espacioo ${resclientes.CLIENTE_ID} fue modificado con éxito`);
   consul();
   return;
   
}
/* ********** FIN DE MODIFICAR DATOS ************/

/--------------------------------- CREAR DATOS --------------------------------------/
if(id.value.trim().length===0){
 if ( cliente_id.value.length === 0 ){
   console.log('El espacio se encuentra vacío');
   swal("Espacio Vacío", "El espacio se encuentra vacío, asegúrate de completar todos los campos", "info");
  }
  else{
   try {
     const {data} = await httpAxios.get<IClientes>(`clientes/${cliente_id.value}`);
     if (cliente_id.value === data.CLIENTE_ID.toString() ){
     console.log('El espacio ya existe');
       swal({
         title: "Espacio ID ya existe",
         text: "El ID ingresado ya existe, desea reactivar el ID que se ingresó?",
         icon: "warning",
         buttons: true,
         dangerMode: true, 
       })
       .then(async (willDelete) => {
         if (willDelete) {
           const recovery = cliente_id.value;
           (await httpAxios.put<IClientes>(`clientes/recuperarCliente/${recovery}`))
           swal(`El dato ${recovery} ha sido recuperado, ahora lo podrás visualizar haciendo uso del botón Consultar`, {
             icon: "success",
           });
           consul();
         } else {
           swal("El dato sigue eliminado, procura ingresar uno distinto");
         }
       });
      }
   } catch (error) {
     try {
       const resclientes:IClientes =  await (await httpAxios.post<IClientes>(`clientes`,data)).data
       console.log(`El espacio ${resclientes.CLIENTE_ID} fue insertado con éxito`);
       consul();
      } catch (error) {
         if (axios.isAxiosError(error))
         {
           console.log(`Error en axios`);
         }
         console.log(error);    
      } 
   }
 }
 /* ********* FIN CREAR ******** */
}

};

export {consul, guarda}