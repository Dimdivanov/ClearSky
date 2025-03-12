import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('loginForm') form: NgForm | undefined;

  onSubmit() {
    if (this.form?.invalid) {
      console.log('not valid form');
      return;
    }

    console.log('form is submitted');
    this.form?.resetForm();
  }
}
