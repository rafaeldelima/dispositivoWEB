import { Component, OnInit } from '@angular/core';
import { Dispositivo } from '../../services/model/dispositivo.model';
import { SharedService } from '../../services/shared.service';
import { DispositivoService } from '../../services/dispositivo.service';
import { ResponseApi } from '../../services/model/response-api';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  dispositivos : Dispositivo[];
  shared: SharedService;
  
  constructor(private dispositivoService: DispositivoService,) {
    this.shared  = SharedService.getIstance();
   }
  ngOnInit() {
    this.buscarDispositivos();
  }

  buscarDispositivos(){
    this.dispositivoService.procurarTodosDispositivosTenant().subscribe((responseApi: ResponseApi) => {
      this.dispositivos = responseApi.data;
    })
  }

  getFromGroupClass(flagAtivo: boolean){
    return {
      'label' : true,
      'label-danger': !flagAtivo,
      'label-success': flagAtivo
    };
  }

  retornaValorAtivo(flagAtivo: boolean){
    if(flagAtivo){
      return "ATIVO";
    }else{
      return "INATIVO";
    }
  }

}
