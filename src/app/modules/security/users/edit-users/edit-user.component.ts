import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RolModel } from 'src/app/models/security/Rol.model';
import { UserModel } from 'src/app/models/security/User.model';
import { RolService } from 'src/app/services/security/rol.service';
import { UserService } from 'src/app/services/security/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});
  rolList: RolModel[] = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private rolService: RolService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.FormBuilding();
    this.searchUser();
    this.getRolList();
  }

  FormBuilding() {
    this.userForm = this.fb.group({
      id: ['', [Validators.required]],
      name: [''],
      email: [''],
      password: [''],
      role_id: [''],
    });
  }
  get GetDF() {
    return this.userForm.controls;
  }

  getRolList() {
    this.rolService.getRecordList().subscribe({
      next: (resp: RolModel[]) => {
        this.rolList = resp;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  searchUser() {
    let id = this.route.snapshot.params['id'];
    console.log('encontre id', id);
    this.userService.searchRecord(id).subscribe({
      next: (data: UserModel) => {
        console.log(data);
        this.GetDF['id'].setValue(data.id);
        this.GetDF['name'].setValue(data.name);
        this.GetDF['email'].setValue(data.email);
        this.GetDF['password'].setValue(data.password);
        this.GetDF['role_id'].setValue(data.role_id);
      },
    });
  }

  editUser() {
    console.log('se hizo click');
    let model = new UserModel(
      this.GetDF['id'].value,
      this.GetDF['name'].value,
      this.GetDF['email'].value,
      this.GetDF['password'].value,
      this.GetDF['role_id'].value
    );

    console.log('modelo', model);
    this.userService.editRecord(model).subscribe({
      next: (data: UserModel) => {
        Swal.fire(
          'Actualizado',
          `user ${data.name} actualizado correctamente`,
          'success'
        );
        this.router.navigate(['/security/list-user']);
      },
    });
  }
}
