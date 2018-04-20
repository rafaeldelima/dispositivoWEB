import { Tenant } from './../../../services/model/tenant.model';
import { Usuario } from './../../../services/model/usuario.model';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../../../services/model/current-user.model';
import { ResponseApi } from '../../../services/model/response-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario('','','','',null,false);
  shared: SharedService;
  mensagem: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) { 
    this.shared = SharedService.getIstance();
  }

  ngOnInit() {
  }

  login(){
    this.usuarioService.login(this.usuario).subscribe((responseApi: ResponseApi ) => {
      
      this.shared.token = "TOKEN-AUTENTICACAO";
      this.shared.usuario = responseApi.data;
      this.shared.tenant = responseApi.data.tenant;
      this.shared.showTemplate.emit(true);
      this.router.navigate(['/'])
      this.mensagem = null
    }, err => {
      this.shared.token = null;
      this.shared.usuario = new Usuario('','','','',null,false);
      this.shared.tenant = null;
      this.shared.showTemplate.emit(false);
      this.router.navigate(['/login'])
      this.mensagem = 'Erro'
    });
  }

  cancelarLogin(){
    this.mensagem = null;
    this.shared.usuario = new Usuario('','','','',null,false);
    window.location.href = '/login';
    window.location.reload();
  }

  getFromGroupClass(isInvalid: boolean, isDirty: boolean){
    return {
      'form-group' : true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

}
