import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClassEditorComponent } from './class-editor/class-editor.component';
import { ClassRegistrationComponent } from './class-registration/class-registration.component';
import { GymclassEditorComponent } from './gymclass-editor/gymclass-editor.component';
import { MemberCheckInComponent } from './member-check-in/member-check-in.component';
import { MemberRegistrationComponent } from './member-registration/member-registration.component';
import { MembershipEditorComponent } from './membership-editor/membership-editor.component';
import { MetricsComponent } from './metrics/metrics.component';
import { TimeClockComponent } from './time-clock/time-clock.component';
import { TimeClockAuditComponent } from './time-clock-audit/time-clock-audit.component';

const routes: Routes = [
  {path: 'class-editor', component: ClassEditorComponent},
  {path: 'class-registration', component: ClassRegistrationComponent},
  {path: 'gymclass-editor', component: GymclassEditorComponent},
  {path: 'member-check-in', component: MemberCheckInComponent},
  {path: 'member-registration', component: MemberRegistrationComponent},
  {path: 'membership-editor', component: MembershipEditorComponent},
  {path: 'metrics', component: MetricsComponent},
  {path: 'time-clock', component: TimeClockComponent},
  {path: 'time-clock-audit', component: TimeClockAuditComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ClassEditorComponent, ClassRegistrationComponent, MemberCheckInComponent, MemberRegistrationComponent, MembershipEditorComponent, MetricsComponent, TimeClockComponent, TimeClockAuditComponent]
