import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Usuario } from '../../services/model/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  shared: SharedService;
  constructor() {
    this.shared  = SharedService.getIstance();
   }

  ngOnInit() {
    
  }

  getNomeUsuario(){
    if(this.shared.usuario == null){
      return "";
    }else{
      return this.shared.usuario.nome + " - " + this.shared.usuario.email + "   ";
    } 
  }

  realizarLoggout(){
    this.shared.usuario = new Usuario('','','','',null,false);
    window.location.href = '/login';
    window.location.reload();
  }

}
