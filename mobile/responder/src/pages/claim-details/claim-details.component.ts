/*
  This component controls the claim details page
*/

//Angular Imports
import { Component, OnInit } from '@angular/core';

//Ionic Imports
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

//Local Imports
import { Claim } from '../../objects/Claim'
import { environment } from '../../services/environment'
import { ClaimService } from '../../services/claims.service'
import { AdjustClaimComponent } from '../adjust-claim/adjust-claim.component'

@Component({
  selector: 'existing-claims',
  templateUrl: 'claim-details.component.html'
})
export class ClaimDetailsComponent implements OnInit {

  claim: Claim
  comment: any

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private claimService: ClaimService, private transfer: FileTransfer, private file: File) {

  }

  //This method runs while the page is loading
  ngOnInit(): void {

    //Get the claim that was passed in from the existing claims page
    this.claim = this.navParams.data

    console.log(this.claim)

  }

  //This method controls what the back button does
  onBack(): void {

    this.navCtrl.pop()
  }

  //This method saves a new comment to the claim
  saveComment(): void {

    if (this.comment) {

      this.claimService.POST(environment.mobileBackendUrl + '/api/v1/bpms/add-comments/' + this.claim.processId, JSON.stringify({ claimComments: this.comment, messageSource: 'responder' })).subscribe((res) => {

        if (!this.claim.comments) {

          this.claim.comments = [];
        }

        this.claim.comments.push({

          message: this.comment,
          title: '',
          commenterName: '',
          commentDate: new Date()
        });

        this.comment = '';
      })
    }
  }

  onCloseTicket(): void {

    this.navCtrl.push(AdjustClaimComponent, this.claim)
  }

  //This method takes a picture
  takePhoto(pictureSourceId: number): void {

    let options: CameraOptions = {

      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: pictureSourceId,
      correctOrientation: true,
      encodingType: 0
    };

    this.camera.getPicture(options).then((imageData) => {

      let imageUri = imageData;

      if (imageUri) {

        this.sendPhoto(imageUri);

        this.camera.cleanup();
      }
    })
  }

  sendPhoto(imageUri) {

    let options: FileUploadOptions = {
      
      fileKey: "file",
      fileName: imageUri.substr(imageUri.lastIndexOf('/') + 1),
      mimeType: "image/jpeg"
    }
    
    const ft: FileTransferObject = this.transfer.create();
    ft.upload(imageUri, encodeURI(environment.mobileBackendUrl + '/api/v1/bpms/upload-photo/' + this.claim.processId + '/' + options.fileName + '/responder'), options).then((success) => {

      var responseData = JSON.parse(success.response);
      var link = responseData.link;

      if (!this.claim.photos) {

        this.claim.photos = [];
      }

      this.claim.photos.push(link);

      console.log('Upload Done')

    }, (err) => {

      console.log
    })
  }
}