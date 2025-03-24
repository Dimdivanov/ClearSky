import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../features/user.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css',
})
export class AuthenticateComponent implements OnInit, OnDestroy {
  isAuthenticating = true;
  //trigger
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService
      .getProfile()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          this.isAuthenticating = false;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.isAuthenticating = false;
        },
        complete: () => {
          this.isAuthenticating = false;
        },
      });
  }

  //activating the trigger with next();
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
