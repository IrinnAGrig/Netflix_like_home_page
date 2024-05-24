declare var google: any;
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user: IUser | null = null;
    router = inject(Router);
    constructor() { }

    get userData(): IUser | null {
        return this.user;
    }
    set userData(user: IUser) {
        this.user = user;
    }
    autoLogin() {
        let data = JSON.parse(sessionStorage.getItem('loggedInUser')!);
        if (data) {
            let loggedUser: IUser = {
                name: data.name,
                email: data.email,
                picture: data.picture
            }
            this.user = loggedUser;
            console.log('sdfs')
            this.router.navigate(['/browse']);
        }
    }
    signOut() {
        google.accounts.id.disableAutoSelect();
        this.router.navigate(['/'])
    }
}