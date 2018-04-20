import { Dispositivo } from './model/dispositivo.model';
import { Cliente } from './model/cliente.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DISPOSITIVO_API } from './dispositivo.api';
import { SharedService } from './shared.service';

@Injectable()
export class ClienteService {

  shared: SharedService;
  constructor(private http: HttpClient) { 
    this.shared  = SharedService.getIstance();
  }

  inserir(cliente: Cliente){

    //Inserindo o cliente
    if(cliente.id != null && cliente.id != ''){
      return this.http.put(`${DISPOSITIVO_API}/cliente`, cliente);
    }else{
      cliente.id = null;
      return this.http.post(`${DISPOSITIVO_API}/cliente`, cliente);
    }
  }

  procurarPorId(id: string){
    return this.http.get(`${DISPOSITIVO_API}/cliente/${id}`);
  }
}
