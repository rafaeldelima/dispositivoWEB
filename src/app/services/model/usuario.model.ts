import { Tenant } from './tenant.model';
export class Usuario{
    constructor(
        public id: string,
        public nome:string,
        public senha:string,
        public email:string,
        public tenant:Tenant,
        public flagAtivo: boolean
    ){};
}