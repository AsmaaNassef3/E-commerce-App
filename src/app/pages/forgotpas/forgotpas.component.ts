import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/servies/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpas',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgotpas.component.html',
  styleUrl: './forgotpas.component.scss'
})
export class ForgotpasComponent {
  private readonly formBilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
step:number=1
isLooding:boolean=false


  verifyEmail:FormGroup = this.formBilder.group({
    email:[null,[Validators.required ,Validators.email]]
  });

  verifyCode:FormGroup = this.formBilder.group({
    resetCode:[null,[Validators.required ,Validators.pattern(/^[0-9]{6}$/)]]
  });

  resetPassword:FormGroup = this.formBilder.group({
    email:[null,[Validators.required ,Validators.email]],
    newPassword:[null ,[Validators.required ,Validators.pattern(/^[A-Z]\w{7,}$/)]],
  });


  verifyEmailSubmit():void{
if(this.verifyEmail.valid){
 let EmailValue = this.verifyEmail.get('email')?.value;
 this.resetPassword.get('email')?.patchValue(EmailValue)
  this.authService.setEmailVerify(this.verifyEmail.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.statusMsg ==='success'){
this.step =2
      }
    },
    error:(err)=>{
      console.log(err)
    }

    })

}

  }


  verifyCodeSubmit():void{
    if(this.verifyCode.valid){
      this.authService.setCodeVerify(this.verifyCode.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status ==='Success'){
    this.step =3
          }
        },
        error:(err)=>{
          console.log(err)
        }

        })

    }

      }

      ResetPasswordSubmit():void{
        if(this.resetPassword.valid){
          this.authService.setResetPass(this.resetPassword.value).subscribe({
            next:(res:any)=>{
              console.log(res)
             localStorage.setItem('userTaken',res.token)
             this.authService.saveUserToken()

             this.router.navigate(['/home'])
            },
            error:(err:any)=>{
              console.log(err)
            }

            })

        }

          }


}
