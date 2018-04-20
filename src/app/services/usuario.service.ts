import { DISPOSITIVO_API } from './dispositivo.api';
import { Usuario } from './model/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario){
    return this.http.post(`${DISPOSITIVO_API}/usuario/login`, usuario);
  }

  criarOuAtualizar(usuario: Usuario){
    if(usuario.id != null && usuario.id != ''){
      return this.http.put(`${DISPOSITIVO_API}/usuario`, usuario);
    }else{
      usuario.id = null;
      return this.http.post(`${DISPOSITIVO_API}/usuario`, usuario);
    }
  }

  procurarTodos(page: number, count: number){
    return this.http.get(`${DISPOSITIVO_API}/usuario`);
  }

  procurarPorId(id: string){
    return this.http.get(`${DISPOSITIVO_API}/api/usuario/${id}`);
  }

  deletar(id: string){
    return this.http.delete(`${DISPOSITIVO_API}/api/usuario/${id}`);
  }

}
