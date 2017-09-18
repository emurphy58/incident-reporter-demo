/*
  This component controls the new claim page
*/

//Angular Imports
import { Component, OnInit } from '@angular/core';

//Ionic Imports
import { NavController } from 'ionic-angular';

//Local Imports
import { Incident } from '../../objects/Incident'
import { Claim } from '../../objects/Claim'
import { Questionnaire } from '../../objects/Questionnaire'
import { Answer } from '../../objects/Answer'
import { Comment } from '../../objects/Comment'
import { environment } from '../../services/environment'
import { ClaimService } from '../../services/claims.service'

@Component({
  selector: 'existing-claims',
  templateUrl: 'new-claim.component.html'
})
export class NewClaimComponent implements OnInit {

  //Objects
  incident: Incident;
  claim: Claim;
  questionnaire: Questionnaire
  answer: Answer
  comment: Comment

  //Test Data
  incidentTypes: string[]
  severities: string[]
  states: string[]

  //Checks
  showIncident: boolean = true;
  loadQuestions: boolean = false;

  answers: any = []

  constructor(public navCtrl: NavController, private claimService: ClaimService) {

  }

  //This method runs while the page is loading
  ngOnInit(): void {

    this.incident = {

      id: 56,
      reporterUserId: 99,
      type: null,
      description: null,
      incidentDate: null,
      buildingName: null,
      stateCode: null,
      zipCode: null,
      severity: null,
    }

    this.severities = ['LOW', 'MEDIUM', 'HIGH']
    this.incident.incidentDate = (Date.now(), 'yyyy-MM-dd')
    this.incident.severity = 'LOW'

    this.incidentTypes = ["windshield", "collision", "hail"]
    this.states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachussetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
      "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
      "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]

    this.claim = {

      id: 0,
      processId: 0,
      incident: this.incident,
      customer: null,
      questionnaire: null,
      photos: null,
      approved: null,
      statedValue: null,
      comments: [],
      answers: [{ strValue: '' }]
    }
  }

  //This method controls what the "Submit" button does
  onSubmit(): void {

    //Add the new claim
    this.claimService.POST(environment.mobileBackendUrl + '/api/v1/bpms/customer-incident', JSON.stringify(this.incident)).subscribe((res) => {

      this.claim.questionnaire = res;
      this.answers = []
      this.showIncident = false
      this.loadQuestions = true;

    })
  }

  updateAnswers(): void {

    var answers = [];

    for(var i = 0; i < this.claim.questionnaire.questions.length; i++) {

      if (!this.answers[i]) {

        if (this.claim.questionnaire.questions[i].answerType === 'YES_NO') {

          this.answers[i] = false;

        } else {

          this.answers[i] = '';
        }
      }
    }

    for(var i = 0; i < this.answers.length; i++) {

      let answer: any = {};

      answer.questionId = this.claim.questionnaire.questions[i].questionId;

      if (this.answers[i] === true) {

        answer.strValue = 'Yes';

      } else if (this.answers[i] === false) {

        answer.strValue = 'No';

      } else {

        answer.strValue = this.answers[i];
      }

      answers.push(answer);
    }

    this.claim.questionnaire.answers = answers;

    if (this.claim.questionnaire.answers.length > 0) {

      this.claimService.POST(environment.mobileBackendUrl + '/api/v1/bpms/update-questions', JSON.stringify(this.claim.questionnaire)).subscribe((res) => {

        this.claim.questionnaire = res
      })
    }
  }

  //This method controls what the close button does
  onClose(): void {

    this.navCtrl.pop()
  }

  //This method controls what the "Finish" button does
  onFinish(): void {

    //Finish Claim
    this.claimService.POST(environment.mobileBackendUrl + '/api/v1/bpms/startprocess', JSON.stringify(this.claim)).subscribe((res) => {

      this.claim.processId = res;

      this.navCtrl.pop()

    })
  }

}
