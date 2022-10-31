import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  constructor(private fb:FormBuilder) { }

  crearUsuario(){
    console.log(this.miFormulario.value);
    console.log(this.miFormulario.valid);
  }
}
