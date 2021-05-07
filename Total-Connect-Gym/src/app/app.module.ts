import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

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
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { RemoveClassComponent } from './class-editor/remove-class/remove-class.component';
import { AddClassComponent } from './class-editor/add-class/add-class.component';
import { AddMembershipComponent } from './membership-editor/add-membership/add-membership.component';
import { RemoveMembershipComponent } from './membership-editor/remove-membership/remove-membership.component';
import { ListClassesComponent } from './list-classes/list-classes.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AddMemberComponent } from './member-registration/add-member/add-member.component';

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
    MetricsComponent,
    routingComponents,
    RemoveClassComponent,
    AddClassComponent,
    AddMembershipComponent,
    RemoveMembershipComponent,
    ListClassesComponent,
    AddMemberComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
