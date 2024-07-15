import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";

import { map, take } from "rxjs/operators";
import { AuthService } from "../shared/services/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) { }

    canActivateChild(
        route: ActivatedRouteSnapshot,
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        );
    }
}
