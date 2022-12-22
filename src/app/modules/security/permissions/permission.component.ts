import { Component } from '@angular/core';
import { PermissionModel } from 'src/app/models/security/Permission.model';
import { PermissionService } from 'src/app/services/security/permission.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/security/user.service';
import { ModalService } from 'src/app/services/general/modal.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
})
export class PermissionComponent {
  public PermissionList: PermissionModel[] = [];
  public cargando: boolean = true;
  closeResult: string | undefined;
  PermissionForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService,
    private generalServicel: ModalService,
    private PermissionService: PermissionService
  ) {}
  ngOnInit(): void {
    this.PermissionForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.getPermission();
  }

  getPermission() {
    this.cargando = true;
    this.PermissionService.getRecordList().subscribe({
      next: (resp: PermissionModel[]) => {
        console.log('this is getPerm repsonse: ', resp);
        this.PermissionList = resp;
        this.cargando = false;
      },
    });
  }

  async savePermission() {
    const { value } = await Swal.fire<string>({
      title: 'Create Permission',
      text: 'Ingrese name del Permission',
      input: 'text',
      inputPlaceholder: 'name del Permission',
      showCancelButton: true,
    });

    let name = value ?? '';
    let model = new PermissionModel(undefined, name);
    if (value?.trim().length! > 0) {
      this.PermissionService.saveRecord(model).subscribe((resp: any) => {
        console.log(resp);
        this.PermissionList = resp;
        Swal.fire('Creado', `permission creado correctamente`, 'success');
        this.getPermission();
      });
    }
  }

  async editPermission(permission: PermissionModel) {
    const inputValue = permission.url;
    const { value: name } = await Swal.fire({
      title: 'Ingerese name',
      input: 'text',
      inputValue: inputValue,
      showCancelButton: true,
    });
    if (name) {
      console.log(name);
      let model = new PermissionModel(permission.id, name);
      this.PermissionService.editRecord(model).subscribe((resp) => {
        Swal.fire('Actualizado', model.url, 'success');
        this.getPermission();
      });
    }
  }

  deletePermission(permission: PermissionModel) {
    Swal.fire({
      title: 'Borrar Permission?',
      text: `Esta a punto de borrar al permission ${permission.url}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.PermissionService.removeRecord(permission.id!).subscribe(
          (resp) => {
            Swal.fire(
              'Registo',
              `${permission.url} eliminado correctamente`,
              'success'
            );
            this.getPermission();
          }
        );
      }
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modela-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult = `Closed with ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.generalServicel.getDismissReason(
            reason
          )}`;
        }
      );
  }
}
