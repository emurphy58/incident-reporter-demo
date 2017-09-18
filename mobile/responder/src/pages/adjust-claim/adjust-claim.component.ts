import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Incident } from '../../objects/Incident'
import { Claim } from '../../objects/Claim'
import { Questionnaire } from '../../objects/Questionnaire'
import { Answer } from '../../objects/Answer'
import { Comment } from '../../objects/Comment'
import { ClaimService } from '../../services/claims.service'
import { environment } from '../../services/environment'

import { ExistingClaimsComponent } from '../existing-claims/existing-claims.component'

@Component({
  selector: 'existing-claims',
  templateUrl: 'adjust-claim.component.html'
})
export class AdjustClaimComponent implements OnInit {

  claim: Claim
  task: any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public claimService: ClaimService) {

  }

  ngOnInit(): void {

    this.claim = this.navParams.data

  }

  onClose(): void {

    this.navCtrl.pop()
  }

  onComplete(): void {

    this.task.task_complete = true;
    this.task.task_approved = true;

    this.claim.approved = true;
    this.claim.questionnaire.completedDate = new Date();
    this.claim.questionnaire.completedBy = 'tester';

    if (this.claim) {

      this.claimService.PUT(environment.mobileBackendUrl + '/v1/api/claim', JSON.stringify(this.claim)).subscribe((res) => {

        this.claim.id = res.guid

        // loadClaim();

        this.claimService.POST(environment.mobileBackendUrl + '/api/v1/bpms/doadjuster/' + this.claim.processId + '/' + true, JSON.stringify(this.task)).subscribe((res) => {

          this.navCtrl.pop()
        })
      })
    }
  }

  onIncomplete(): void {

    this.task.task_complete = false;
    this.task.task_approved = false;

    this.claimService.POST(environment.mobileBackendUrl + '/api/v1/bpms/doadjuster/' + this.claim.processId + '/' + false, JSON.stringify(this.task)).subscribe((res) => {

      this.navCtrl.pop()
    })
  }
}
