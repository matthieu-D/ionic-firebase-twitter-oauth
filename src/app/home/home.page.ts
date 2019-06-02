import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user;

  constructor(public twitterConnect: TwitterConnect,
    public afAuth: AngularFireAuth,
    public platform: Platform) {}

  login() {
    this.twitterConnect.login().then(this.onSuccess, this.onError);
  }

  onSuccess = response => {
    const twitterCredential = firebase.auth.TwitterAuthProvider.credential(
      response.token,
      response.secret
    );
  
    this.afAuth.auth
      .signInWithCredential(twitterCredential)
      .then(res => {
        this.user = res.user;
      })
      .catch(error => console.log("error", error));
  };

  onError(error) {
    console.log('error', error);
  }

}
