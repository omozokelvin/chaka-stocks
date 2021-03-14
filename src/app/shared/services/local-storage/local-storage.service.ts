import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  private isJson(str: string) {
    try {
      if(!str) {
        throw new Error("");
      }
      JSON.parse(str);
    } catch(e) {
      return false;
    }
    return true;
  }


  set(key: string, value: {} | string): boolean {

    try {
      if(typeof value === 'string') {
        localStorage.setItem(key, value as string);
        return true;
      }

      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch(error) {
      return false;
    }

  }


  get(key: string, defaultValue: {} | string = ""): string | {} | null {
    try {
      const value = localStorage.getItem(key);

      if(this.isJson(value)) {
        return JSON.parse(value);
      }

      return value || defaultValue;

    } catch(error) {
      return defaultValue;
    }
  }

}
