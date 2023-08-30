import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, throwError } from 'rxjs';
import { ContactService } from 'src/services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'project-test';
  passwordVisible = false;

  formUser = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    public toastrService: ToastrService,
    ) {}

  ngOnInit() {
    this.setForm();
  }

  setForm(): void {
    this.formUser = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement) {
    this.passwordVisible = !this.passwordVisible;

    if (this.passwordVisible) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
  

  login() {
    let user = this.formUser.getRawValue();
    let errorLogin = false;
    if(user.username && user.password){
      this.contactService.login(user.username, user.password).pipe(finalize(() => {
        if (errorLogin === true) {
        console.log('entrou')
         catchError((err : any) => { return throwError(() => err)})
        } else alert('sucesso')
      } )).subscribe((res:any) => {
        res === null ? errorLogin = true : errorLogin = false;
        localStorage.setItem('tokenInfo', JSON.stringify(res));
        this.toastrService.show('Proposta finalizada com sucesso.', '', {
          toastClass: 'success-toast',
        });
      });
    }
  }
}
