import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('loginForm') form: NgForm | undefined;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.form?.invalid) {
      console.log('not valid form');
      return;
    }

    const { email, password } = this.form?.value;
    this.userService.login(email!, password!).subscribe({
      next: () => console.log('login went through'),
    });
    
    this.form?.resetForm();
  }
}
