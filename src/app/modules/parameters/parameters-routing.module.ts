import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldEditComponent } from './fields/field-edit/field-edit.component';
import { FieldComponent } from './fields/field.component';
import { EditFieldTypeComponent } from './fieldTypes/edit-fieldTypes/edit-field-type.component';
import { FieldTypeComponent } from './fieldTypes/field-type.component';
import { EditLocationComponent } from './location/edit-location/edit-location.component';
import { LocationComponent } from './location/location.component';
import { SportTypeComponent } from './sportTypes/sport-type.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: 'location-list',
    component: LocationComponent
  },

  {
    path: 'location-edit/:id',
    component: EditLocationComponent
  },

  {
    path: 'team-list',
    component: TeamComponent

  },
  {
    path: 'fieldType-list',
    component: FieldTypeComponent
  },

  {
    path: 'fieldType-edit/:id',
    component: EditFieldTypeComponent
  },

  {
    path: 'field-list',
    component: FieldComponent
  },
  {
    path: 'field-edit',
    component: FieldEditComponent
  },
  // {
  //   path: 'field-edit:/id',
  //   component:
  // }
  {
    path:'sportType-list',
    component:SportTypeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
