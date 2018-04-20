import { Tenant } from "./tenant.model";
import { Cliente } from "./cliente.model";

export class Dispositivo{
    constructor(
        public id:string,
        public uuid:string ,
        public flagAtivo:boolean,
        public tenant:Tenant,
        public cliente:Cliente         
    ){

    }
}