import { Injectable } from '@angular/core';
export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  setTheme(theme: Theme){

  }
}
