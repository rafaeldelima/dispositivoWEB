import { Tenant } from './model/tenant.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { DISPOSITIVO_API } from './dispositivo.api';
import { Dispositivo } from './model/dispositivo.model';
import { Cliente } from './model/cliente.model';

@Injectable()
export class DispositivoService {

  shared: SharedService;
  constructor(private http: HttpClient) {
    this.shared  = SharedService.getIstance();
   }
  
  procurarTodosDispositivosTenant(){
    return this.http.get(`${DISPOSITIVO_API}/dispositivo/tenant/${this.shared.tenant.id}`);
  }

  procurarTodosDispositivosDoCliente(cliente: Cliente){
    return this.http.get(`${DISPOSITIVO_API}/dispositivo/cliente/${cliente.id}`);
  }

  inserir( dispositivo:Dispositivo){
    
    //Atualizando dados do dispositivo   
    dispositivo.tenant = this.shared.tenant;
    //console.log(this.shared.tenant);
    //Inserindo o dispositivo
    if(dispositivo.id != null && dispositivo.id != ''){
      return this.http.put(`${DISPOSITIVO_API}/dispositivo`, dispositivo);
    }else{
      dispositivo.id = null;
      return this.http.post(`${DISPOSITIVO_API}/dispositivo`, dispositivo);
    }
  }

}
