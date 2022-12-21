import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { UserComponent } from './users/user.component';
import { ComponentModule } from 'src/app/components/component.module';
import { RolsComponent } from './rols/rols.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from './users/edit-users/edit-user.component';
import { PermissionComponent } from './permissions/permission.component';


@NgModule({
  declarations: [
    UserComponent,
    RolsComponent,
    EditUserComponent,
    PermissionComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ComponentModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SecurityModule { }
