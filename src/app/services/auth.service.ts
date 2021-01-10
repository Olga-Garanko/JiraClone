import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  constructor(private http: HttpClient,
    private router: Router, private db: AngularFireDatabase, private authFb: AngularFireAuth) {
    this.user$ = this.authFb.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    );
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.authFb.signInWithPopup(provider);
    this.updateUserData(credential.user);
    return this.router.navigate(['/']);
  }

  async signOut() {
    await this.authFb.signOut();
    return this.router.navigate(['/auth/login']);
  }

  updateUserData(user) {
    const userRef: any = this.db.database.ref('users/' + user.uid);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }
    return userRef.set(data)
  }

  async signUp(displayName: string, email: string, password: string) {
    const credential = await this.authFb.createUserWithEmailAndPassword(email, password);
    const user = {
      ...credential.user,
      displayName
    }
    this.updateUserData(user);
    return this.router.navigate(['/']);
  }
    
  async signIn(email: string, password: string) {
    const credential = await this.authFb.signInWithEmailAndPassword(email, password);
    this.updateUserData(credential.user);
    return this.router.navigate(['/']);
  }
}
