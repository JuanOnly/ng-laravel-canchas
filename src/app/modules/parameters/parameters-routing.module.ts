import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldEditComponent } from './fields/field-edit/field-edit.component';
import { FieldComponent } from './fields/field.component';
import { EditFieldTypeComponent } from './fieldTypes/edit-fieldTypes/edit-field-type.component';
import { EditLocationComponent } from './location/edit-location/edit-location.component';
import { LocationComponent } from './location/location.component';
import { TeamComponent } from './team/team.component';
import { RatingsComponent } from './ratings/ratings.component';
import { ReservationComponent } from './reservations/reservation.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
const routes: Routes = [
  {
    path: 'location-list',
    component: LocationComponent,
  },

  {
    path: 'location-edit/:id',
    component: EditLocationComponent,
  },

  {
    path: 'team-list',
    component: TeamComponent,
  },

  {
    path: 'fieldType-edit/:id',
    component: EditFieldTypeComponent,
  },

  {
    path: 'field-list',
    component: FieldComponent,
  },
  {
    path: 'field-edit',
    component: FieldEditComponent,
  },
  {
    path: 'reservations',
    component: ReservationComponent,
  },
  {
    path: 'ratings',
    component: RatingsComponent,
  },
  {
    path: 'profiles',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
