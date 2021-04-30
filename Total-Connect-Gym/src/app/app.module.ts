import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MemberCheckInComponent } from './member-check-in/member-check-in.component';
import { TimeClockComponent } from './time-clock/time-clock.component';
import { TimeClockAuditComponent } from './time-clock-audit/time-clock-audit.component';
import { ClassRegistrationComponent } from './class-registration/class-registration.component';
import { ClassEditorComponent } from './class-editor/class-editor.component';
import { MembershipEditorComponent } from './membership-editor/membership-editor.component';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';
import { MetricsComponent } from './metrics/metrics.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    MemberCheckInComponent,
    TimeClockComponent,
    TimeClockAuditComponent,
    ClassRegistrationComponent,
    ClassEditorComponent,
    MembershipEditorComponent,
    MemberRegistrationComponent,
    MetricsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
