import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { NovoClienteComponent } from './components/novo-cliente/novo-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from "@angular/router"
import { LoginComponent } from './components/security/login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from "./components/security/auth.guard";
import { NovoUsuarioComponent } from "./components/novo-usuario/novo-usuario.component";

export const ROUTES: Routes = [
    {path : '', component: HomeComponent, canActivate: [AuthGuard]},
    {path : 'login', component: LoginComponent},
    {path : 'novo-usuario', component: NovoUsuarioComponent, canActivate: [AuthGuard]},
    {path : 'novo-cliente', component: NovoClienteComponent, canActivate: [AuthGuard]},
    {path : 'lista-clientes', component: ListaClientesComponent, canActivate: [AuthGuard]}
    
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);