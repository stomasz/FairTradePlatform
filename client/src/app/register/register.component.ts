import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
 // model: any = {};
  registerForm: FormGroup;
  validationErrors: string[] = [];
  

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   this.initializeForm();
  }


  initializeForm(){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, 
        Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]

    })
  }

  matchString(matchTo: string) : ValidatorFn{
    return (controll: AbstractControl) => {
      return controll?.value === controll?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(resp => {
      this.router.navigateByUrl('/');
    }, error => {
      this.validationErrors = error;
    });
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

}
