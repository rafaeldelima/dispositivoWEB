import { DispositivoService } from './../../services/dispositivo.service';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../../services/model/cliente.model';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../../services/model/dispositivo.model';
import { ResponseApi } from '../../services/model/response-api';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css']
})
export class NovoClienteComponent implements OnInit {
  @ViewChild("form")
  form: NgForm
  
  cliente : Cliente = new Cliente('','','');
  dispositivo: Dispositivo = new Dispositivo('', '', true, null, null);
  shared: SharedService;
  mensagem: {}
  classCss: {}

  constructor(
    private clienteService: ClienteService,
    private dispositivoService: DispositivoService,
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
    this.clienteService.procurarPorId(id).subscribe((responseApi: ResponseApi) => {
      this.cliente = responseApi.data;

      this.dispositivoService.procurarTodosDispositivosDoCliente(this.cliente).subscribe((responseDispo: ResponseApi) => {
        this.dispositivo = responseDispo.data;
      }, err => {
        this.mostrarMensagem({
          type: 'error',
          text: err['error']['errors'][0]
        });
      })
    }, err => {
      this.mostrarMensagem({
        type: 'error',
        text: err['error']['errors'][0]
      });
    })
  }

  registrar(){
    this.mensagem = {};
    this.clienteService.inserir(this.cliente).subscribe((responseApi: ResponseApi) => {      
      this.cliente = responseApi.data;
    }, err => {
      this.mostrarMensagem({
        type: 'error',
        text: err['error']['errors'][0]
      });
    })
    if(this.cliente.id != null){
      this.dispositivo.cliente = this.cliente;

      this.dispositivoService.inserir(this.dispositivo).subscribe((responseApi: ResponseApi) => {        
        this.mostrarMensagem({
          type: 'success',
          text: `Cliente ${this.cliente.nome} registrado`
        });
        this.cliente = new Cliente('','','');
        this.dispositivo = new Dispositivo('','', true, null, null);
        this.form.resetForm();
      }, err => {
        this.mostrarMensagem({
          type: 'error',
          text: err['error']['errors'][0]
        });
      })
    }
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
