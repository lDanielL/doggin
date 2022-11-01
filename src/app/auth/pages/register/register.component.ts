import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent  {

  miFormulario: FormGroup = this.fb.group({
    username:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  });

  constructor(private fb:FormBuilder,
    private route:Router,
    private authService:AuthService
    ) { }

  crearUsuario(){
    
    if(this.miFormulario.valid){
      
      const { username,email, password } = this.miFormulario.value;

      this.authService.registro(username,email,password)
        .subscribe(ok=>{
          if(ok === true) {
            this.route.navigateByUrl('/dashboard');
          }else{
           
            Swal.fire('Error', ok, 'error');

          }
      
        })
    }
  }
}
