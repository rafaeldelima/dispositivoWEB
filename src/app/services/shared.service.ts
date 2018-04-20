import { Injectable, EventEmitter} from '@angular/core';
import { Usuario } from './model/usuario.model';
import { Tenant } from './model/tenant.model';

@Injectable()
export class SharedService {

  public static instance: SharedService = null;
  usuario: Usuario;
  tenant: Tenant;
  token: string;
  showTemplate = new EventEmitter<boolean>();
  
  constructor() {
    return SharedService.instance;
   }

   public static getIstance(){
     if(this.instance == null){
        this.instance = new SharedService();
     }
     return this.instance;
   }

   usuarioLogado(): boolean{
    if(this.usuario == null){
      return false;
    }
    return this.usuario.email != '';
    
   }

}
