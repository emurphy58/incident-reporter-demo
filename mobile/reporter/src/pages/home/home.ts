/*
  This component controls the home page
*/

//Angular Imports
import { Component } from '@angular/core';

//Ionic Imports
import { NavController } from 'ionic-angular';

//Local Imports
import { ExistingClaimsComponent } from '../existing-claims/existing-claims.component'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  //This method controls what the "Get Started" button does
  onGetStarted(): void {

    //Navigate to the existing claims page
    this.navCtrl.push(ExistingClaimsComponent)
  }

}
