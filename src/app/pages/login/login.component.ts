import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/services/test.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
    private router: Router,
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
      this.contactService.login(user.username, user.password).subscribe((res:any) => {
        res === null ? errorLogin = true : errorLogin = false;
        if(res === null) {
          this.toastrService.show('Nome de usuário ou senha incorreto.', '', {
            toastClass: 'error-toast',
          });
        } else {
          localStorage.setItem('tokenInfo', JSON.stringify(res));
          this.router.navigate(['/contatos']); 
          this.toastrService.show('Login realizado com sucesso.', '', {
            toastClass: 'success-toast',
          });
        }
      });
    }
  }
}
