import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData, SignUpData } from '../shared/services/auth/auth.model';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  modeSignIn = true;
  errorSignIn = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.modeSignIn) {
      let data: LoginData = {
        email: this.loginForm.value['email'],
        password: this.loginForm.value['password']
      }
      this.signIn(data);
    }
    // else {
    //   let data: SignUpData = {
    //     email: this.signUpForm.value['email'],
    //     fullName: this.signUpForm.value['fullName'],
    //     password: this.signUpForm.value['password']
    //   }
    //   console.log(data)
    //   this.authService.signUp(data).subscribe(res => {
    //     localStorage.setItem("userDetails", JSON.stringify(res));
    //     this.router.navigate(['/home']);
    //   });
    // }
    this.errorSignIn = false;
  }
  signIn(data: LoginData) {
    this.authService.signIn(data).subscribe((res) => {
      if (res) {
        localStorage.setItem("userDetails", JSON.stringify(res));
        this.router.navigate(['/applications']);
      } else {
        this.errorSignIn = true;
      }
    },
      () => {
        this.errorSignIn = true;
      });
  }

  changeMode(mode: boolean) {
    this.modeSignIn = mode;
    if (mode) {
      this.loginForm.reset();
      this.errorSignIn = false;
    } else {
      this.signUpForm.reset();
      this.errorSignIn = false;
    }
  }
}
