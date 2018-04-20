import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Usuario } from "../../services/model/usuario.model";
import { SharedService } from "../../services/shared.service";
import { UsuarioService } from "../../services/usuario.service";
import { ActivatedRoute } from "@angular/router";
import { ResponseApi } from "../../services/model/response-api";

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  usuario = new Usuario('','','','',null,false);
  shared: SharedService;
  mensagem: {}
  classCss: {}

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {
    this.shared  = SharedService.getIstance();
  }

  ngOnInit() {
    let id : string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id: string){
    this.usuarioService.procurarPorId(id).subscribe((responseApi: ResponseApi) => {
      this.usuario = responseApi.data;
      this.usuario.senha = '';
    }, err => {
      this.mostrarMensagem({
        type: 'error',
        text: err['error']['errors'][0]
      });
    })
  }

  registrar(){
    this.mensagem = {};
    this.usuarioService.criarOuAtualizar(this.usuario).subscribe((responseApi: ResponseApi) => {
      this.usuario = new Usuario('','','','',null,false);
      let usuarioRet: Usuario = responseApi.data;
      this.form.resetForm();
      this.mostrarMensagem({
        type: 'success',
        text: `Usuario ${usuarioRet.email} registrado`
      });
    }, err => {
      this.mostrarMensagem({
        type: 'error',
        text: err['error']['errors'][0]
      });
    })
  }

  private mostrarMensagem(message: {type: string, text:string}) : void{
    this.mensagem = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.mensagem = undefined;
    }, 3000);
  }

  private buildClasses(type: string) : void{
    this.classCss = {
      'alert' : true
    }
    this.classCss['alert-' + type] = true;
  }

  getFromGroupClass(isInvalid: boolean, isDirty: boolean){
    return {
      'form-group' : true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }

}
