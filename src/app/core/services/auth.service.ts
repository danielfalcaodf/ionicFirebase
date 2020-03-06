import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { User, AuthProvider, AuthOptions } from './auth.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.authState$ = this.afAuth.authState;
   }
get isAuthenticated(): Observable<boolean>
{
  return this.authState$.pipe(map(user => user !== null ))
}

  authenticate({isSignIn, provider, user}: AuthOptions): Promise<auth.UserCredential>
  {
    let operation: Promise<auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      operation = this.loginPopup(provider);
    }
    else{
      operation = isSignIn ? this.loginComEmail(user) : this.criarLoginComEmail(user);
    }
    return operation;
  }
logout(): Promise<void>
{
  return this.afAuth.auth.signOut();
}
  private loginComEmail({email, password}: User): Promise<auth.UserCredential>
  {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  private criarLoginComEmail({email, password, name}: User): Promise<auth.UserCredential>
  {
        return this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(credential => 
          credential.user.updateProfile({displayName: name, photoURL: null})
          .then(() => credential )
        );
  }
  private loginPopup(provider: AuthProvider): Promise<auth.UserCredential>
  {
      let signInprovider = null

      switch (provider)
      {
        case AuthProvider.Facebook:
          signInprovider = new auth.FacebookAuthProvider();
          break;
      
        default:
          break;
      }
      return this.afAuth.auth.signInWithPopup(signInprovider);
  }
}
 