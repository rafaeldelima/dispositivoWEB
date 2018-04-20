import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { SharedService } from "../../services/shared.service";

@Injectable()
export class AuthGuard implements CanActivate{
    
    shared: SharedService;

    constructor(private router: Router){
        this.shared = SharedService.getIstance();
    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | boolean {
            
        if(this.shared.usuarioLogado()){
           return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }

    }

}