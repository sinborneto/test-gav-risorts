import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const tokenInfoString = localStorage.getItem('tokenInfo');
    console.log(tokenInfoString)
    if (tokenInfoString) {
    const tokenInfo = JSON.parse(tokenInfoString);
    const expirationTimestamp = new Date(tokenInfo.expirationDate).getTime(); // Convertendo a data para timestamp

    if (tokenInfo.token && expirationTimestamp > Date.now()) {
        return true; // Permite acesso à rota
    }
    }
    this.router.navigate(['/login']); // Redireciona para a página de login
    return false; // Não permite acesso à rota
  }
}