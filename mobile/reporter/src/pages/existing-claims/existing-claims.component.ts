/*
  This component controls the existing claims page
*/

//Angular Imports
import { Component, OnInit } from '@angular/core';

//Ionic Imports
import { NavController } from 'ionic-angular';

//Local Imports
import { NewClaimComponent } from '../new-claim/new-claim.component'
import { ClaimDetailsComponent } from '../claim-details/claim-details.component'
import { ClaimService } from '../../services/claims.service'
import { Claim } from '../../objects/Claim'
import { environment } from '../../services/environment'

@Component({

  selector: 'existing-claims',
  templateUrl: 'existing-claims.component.html',
})
export class ExistingClaimsComponent implements OnInit {

  //Objects
  claims: [Claim]  //An array of claims
  claim: Claim    //A single claim

  //Checks
  gotData: boolean = false

  constructor(public navCtrl: NavController, public claimService: ClaimService) {

  }

  //This method runs while the page is loading
  ngOnInit(): void {

    //Get all the available claims
    //this.claimService.getClaims('./json/claims.json').subscribe((res) => {
    this.claimService.GET(environment.mobileBackendUrl + '/v1/api/claims').subscribe((res) => {

      //Store the claims in an array of claims
      this.claims = res;

      //HTML is free to load claims data now
      this.gotData = true;

    })
  }

  //This method controls what the "?" button does
  onHelp(): void {

    //Go back
    this.navCtrl.pop()

  }

  //This method controls what the "New" button does
  onNew(): void {

    //Go to the new claim page
    this.navCtrl.push(NewClaimComponent)

  }

  //This method controls what the claim details arrow does
  onLoadClaimDetails(claim: Claim): void {

    //Go to the claim detail page and pass in the claim that was selected
    this.navCtrl.push(ClaimDetailsComponent, claim)

  }

  doRefresh(refresher) {

    //Get all the available claims
    //this.claimService.getClaims('./json/claims.json').subscribe((res) => {
    this.claimService.GET(environment.mobileBackendUrl + '/v1/api/claims').subscribe((res) => {

      //Store the claims in an array of claims
      this.claims = res;

      refresher.complete();

    })

    setTimeout(() => {

      refresher.complete()

    }, 5000)
  }

}
