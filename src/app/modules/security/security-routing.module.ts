import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionComponent } from './permissions/permission.component';
import { RolsComponent } from './rols/rols.component';
import { EditUserComponent } from './users/edit-users/edit-user.component';
import { UserComponent } from './users/user.component';

const routes: Routes = [
  {
    path: 'list-user',
    component: UserComponent,
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
  },
  {
    path: 'list-rol',
    component: RolsComponent,
  },

  {
    path: 'permissions',
    component: PermissionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
