import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ExistingClaimsComponent } from '../pages/existing-claims/existing-claims.component'
import { OrderByPipe } from '../pages/existing-claims/orderBy.pipe'
import { AdjustClaimComponent } from '../pages/adjust-claim/adjust-claim.component'
import { ClaimDetailsComponent } from '../pages/claim-details/claim-details.component'
import { ClaimService } from '../services/claims.service'
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ExistingClaimsComponent,
    AdjustClaimComponent,
    ClaimDetailsComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ExistingClaimsComponent,
    AdjustClaimComponent,
    ClaimDetailsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClaimService,
    Camera,
    FileTransfer,
    File
  ]
})
export class AppModule {}
