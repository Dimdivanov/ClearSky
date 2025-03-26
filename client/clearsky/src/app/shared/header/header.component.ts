import { Component } from '@angular/core';
import { UserService } from '../../features/user.service';
import { Router } from '@angular/router';
import { HighlightMenuDirective } from '../../directives/highlight-menu.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HighlightMenuDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  toggleTheme() {
    console.log('theme has been changed');
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => {
        console.log('Successfully logged out!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => console.error('Logout failed', err),
    });
  }
}
