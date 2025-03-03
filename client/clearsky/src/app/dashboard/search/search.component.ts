import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Output() searchEvent = new EventEmitter<string>();

  constructor(private router: Router) {}

  onSubmit(event: Event, input: HTMLInputElement): void {
    event.preventDefault();
    const query = input.value.trim().toLocaleLowerCase();

    if (query) {
      this.searchEvent.emit(query); // Emit search query

      this.router.navigate([], {
        queryParams: { search: query },
        queryParamsHandling: 'merge',
      });

      input.value = '';
    }
  }
}
