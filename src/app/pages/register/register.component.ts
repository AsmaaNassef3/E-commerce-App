// import { Component, inject } from '@angular/core';
// import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
// import { AuthService } from '../../core/servies/auth/auth.service';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-register',
//   imports: [ReactiveFormsModule,RouterLink, CommonModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss'
// })
// export class RegisterComponent {

// isLooding:boolean=false;
// msgError:string="";
// msgSuccess:string="";
//  private readonly authService = inject(AuthService);
//  private readonly router = inject(Router)

// RegisterForm:FormGroup = new FormGroup({
// name:new FormControl (null ,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
// email:new FormControl (null ,[Validators.required ,Validators.email]),
// password:new FormControl (null ,[Validators.required ]),
// rePassword:new FormControl (null,[Validators.required]),
//  phone:new FormControl (null ,[Validators.required ]),
// },{validators : this.confirmPassword} )


// submitForm():void{
//   console.log(this.RegisterForm)
// if(this.RegisterForm.valid){
//   this.isLooding = true
//   this.authService.sendRegisterForm(this.RegisterForm.value).subscribe({
//     next: (res) => {
//       console.log(res)
//       if(res.message=== 'success'){
// setTimeout(() => {
//   this.router.navigate(['/login'])
// }, 500);
// this.msgSuccess=res.message
//       }
//       this.isLooding = false
//     },

//     error:(err:HttpErrorResponse)=>{
//       console.log(err);
//       this.isLooding = false;
//       this.msgError = err.error.message;
//     }
//   })
// }else{
//   this.RegisterForm.markAllAsTouched()
// }
// }
// confirmPassword(group:AbstractControl){

//   const password = group.get('password')?.value;
//   const repassword = group.get('rePassword')?.value;

//   return password ===repassword ?null : {mismatch:true}

// }


// }
import { AuthService } from '../../core/servies/auth/auth.service';
import { Component, inject } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule,RouterLink,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

private readonly formBuilder = inject(FormBuilder)
private readonly router = inject(Router)


  private readonly authService = inject(AuthService);

registerForm:FormGroup = this.formBuilder.group({
  name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required]],
  rePassword:[null,[Validators.required]],
  phone:[null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
},{validators: this.confirmPassword});

isLooding:boolean=false;
msgError:string="";
msgSuccess:string="";

submitForm():void{
  if(this.registerForm.valid){
    this.isLooding = true;
    this.authService.sendRegisterForm(this.registerForm.value).subscribe({
      next:(res: any)=>{
        this.isLooding = false;
        if(res && res.message && res.message.toLowerCase() === 'success'){
          this.msgSuccess = res.message;
          this.router.navigate(['/login']);
        } else {
          this.msgError = res?.message || 'Registration failed';
        }
      },
      error:(err: any)=>{
        this.isLooding = false;
        this.msgError = err?.error?.message || 'Registration failed';
        console.log(err);
      }
    })
  }else{
    this.registerForm.markAllAsTouched();
    this.msgError = 'Please fill out the form correctly.';
  }
}

confirmPassword(group:AbstractControl){
  const password = group.get('password')?.value;
  const rePassword = group.get('rePassword')?.value;
  return password === rePassword ? null : {mismatch:true};
}

}

