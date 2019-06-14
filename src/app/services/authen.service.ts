import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthenService {
    private accessKey = 'accessToken';

    setAuthrnticate(acessToken: string): void {
        localStorage.setItem(this.accessKey, acessToken);
    }

    getAuthenticated(): string {
        return localStorage.getItem(this.accessKey);
    }

    clearAuthenticated(): void {
        localStorage.removeItem(this.accessKey);
    }
}
