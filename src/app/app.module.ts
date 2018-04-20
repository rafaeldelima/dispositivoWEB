import { ClienteService } from './services/cliente.service';
import { DispositivoService } from './services/dispositivo.service';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { SharedService } from './services/shared.service';
import { UsuarioService } from './services/usuario.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from "./components/security/auth.interceptor";
import { AuthGuard } from "./components/security/auth.guard";
import { NovoUsuarioComponent } from './components/novo-usuario/novo-usuario.component';
import { NovoClienteComponent } from './components/novo-cliente/novo-cliente.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NovoUsuarioComponent,
    NovoClienteComponent,
    ListaClientesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [
    UsuarioService,
    ClienteService,
    DispositivoService,
    SharedService,  
    AuthGuard,  
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
