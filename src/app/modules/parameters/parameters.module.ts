import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { LocationComponent } from './location/location.component';
import { ComponentModule } from 'src/app/components/component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditLocationComponent } from './location/edit-location/edit-location.component';
import { TeamComponent } from './team/team.component';
import { FieldTypeComponent } from './fieldTypes/field-type.component';
import { EditFieldTypeComponent } from './fieldTypes/edit-fieldTypes/edit-field-type.component';
import { FieldComponent } from './fields/field.component';
import { FieldEditComponent } from './fields/field-edit/field-edit.component';
import { SportTypeComponent } from './sportTypes/sport-type.component';


@NgModule({
  declarations: [
    LocationComponent,
    EditLocationComponent,
    TeamComponent,
    FieldTypeComponent,
    EditFieldTypeComponent,
    FieldComponent,
    FieldEditComponent,
    SportTypeComponent
  ],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    ComponentModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class ParametersModule { }
