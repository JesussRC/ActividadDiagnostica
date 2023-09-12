export interface IResCliente{
    total: number;
    clientes: IClientes[];
}
// Atributos de la ruta clientes
export interface IClientes{
    _id?: string;
    CLIENTE_ID: number;
    CLIENTE_NOMBRE: string;
    CLIENTE_CEDULA: string;
    CLIENTE_TELEFONO: string;
    Estado?: boolean;
    __v?: string;

}