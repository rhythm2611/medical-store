import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class GuestGuardService implements CanActivate {

  constructor(private authService: AuthService, private alertService : AlertService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.authService.isLoggedIn()){
        this.alertService.alert('info', 'Already Logged In', true);
        this.router.navigate(['/profile'])
        return true
    }else{
      return false
    } 
  }
}
