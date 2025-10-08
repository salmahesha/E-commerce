import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../../../../shared/services/authentication/auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  userEmail!:string;
  imageUrl!:string;
  userName!:string;
  errorMsg!:string;
  correctMsg!:string;

  private readonly _AuthService =inject(AuthService)
  private readonly _FormBuilder =inject(FormBuilder);
  editForm:FormGroup = this._FormBuilder.group({
    name:[null,[Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    phone:[null,[Validators.pattern(/^01[125][1-9]{8}$/)]]

  }) 
  ngOnInit() {
    this.imageUrl = localStorage.getItem('URL')!;
    this.userEmail = localStorage.getItem('userEmail')!;
    this.userName = this._AuthService.userInfo.name;
    this.editForm.patchValue({
    name: this.userName,
    email: this.userEmail,
    phone: ''     });
    
  }
  log(e:Event){
    let url = e.target as HTMLInputElement;
    console.log(url.files);
      localStorage.setItem('URL',`./images/${url.files?.[0].name}`);
      this.imageUrl=localStorage.getItem('URL')!
  }
  edit(){
   if(this.editForm.valid){
    this._AuthService.updateLoggedUserData(this.editForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        if(res.message === 'success'){
          this.correctMsg = 'Email updated successfully❤️';
          this.userName = this.editForm.get(['name'])?.value;
          this.userEmail = this.editForm.get(['email'])?.value;
          localStorage.setItem('userEmail',this.userEmail);
          this._AuthService.userInfo.name =this.editForm.get(['name'])?.value;
          this.errorMsg ='';
        }
        
      },
      error:(err)=>{
        console.log(err);
        if(err.error.message == 'fail'){

          this.errorMsg = err.error.errors.msg;
          this.correctMsg ='';
        }
        
      }
    })
   }
  }

}
