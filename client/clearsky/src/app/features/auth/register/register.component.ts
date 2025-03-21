import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private userService: UserService) {}
  //TO DO validations
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
  });

  onRegisterSubmit() {
    const { username, email, password, rePassword } = this.registerForm.value;

    this.userService
      .register(username!, email!, password!, rePassword!)
      .subscribe({
        next: () => console.log('subscribe went through'),
      });
    this.registerForm.reset();
  }
}
