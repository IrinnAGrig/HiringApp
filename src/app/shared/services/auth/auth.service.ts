import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, switchMap, tap } from 'rxjs/operators';
import { throwError, Observable, Subject, BehaviorSubject, from } from 'rxjs';
import { Router } from "@angular/router";
import { environment } from "src/assets/environment/environment";
import { LoginData, SignUpData, User } from "./auth.model";
//import { AngularFirestore } from "@angular/fire/compat/firestore";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    usertype!: User;
    dataStorage!: string | null;
    user = new BehaviorSubject<User>(this.usertype);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private router: Router) { }

    signUp(data: SignUpData, role: string) {
        // return this.http
        //     .post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
        //         {
        //             email: data.email,
        //             password: data.password,
        //             returnSecureToken: true
        //         })
        //     .pipe(
        //         switchMap((responseData) => {
        //            // return this.saveUserToFirestore(responseData.localId, data.fullName, data.email, role);
        //         }),
        //         catchError(this.handlerError)
        //     );
    }
    // private saveUserToFirestore(userId: string, fullName: string, email: string, role: string): Observable<any> {
    //     const userData = {
    //         fullName: fullName,
    //         email: email,
    //         role: role
    //     };


    //     return from(this.firestore.collection("users").doc(userId).set(userData));
    // }
    signIn(data: LoginData) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        })
            .pipe(catchError(this.handlerError), tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
            }));

    }

    logout() {
        this.user.next(this.usertype);
        this.router.navigate(['/home']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expiratioDuration: number) {

        setTimeout(() => {
            this.logout();
        }, expiratioDuration);
    }

    autoLogin() {
        this.dataStorage = localStorage.getItem('userData');
        if (typeof this.dataStorage === "string") {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string;
            } = JSON.parse(this.dataStorage);

            if (!userData) {
                return;
            }

            const loaderUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate));
            if (loaderUser.token) {
                this.user.next(loaderUser);
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout(expirationDuration);
            }
        }
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: string) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 10000);
        const user = new User(
            email, userId, token, expirationDate
        );
        this.user.next(user);
        this.autoLogout(+expiresIn * 10000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handlerError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error ocured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(new Error(errorMessage));
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
        }
        return throwError(new Error(errorMessage));
    }

}