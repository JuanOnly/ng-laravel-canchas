import { Component } from '@angular/core';
import { RolModel } from 'src/app/models/security/Rol.model';
import { RolService } from 'src/app/services/security/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rols',
  templateUrl: './rols.component.html',
  styleUrls: ['./rols.component.css'],
})
export class RolsComponent {
  public rolList: RolModel[] = [];
  public cargando: boolean = true;
  constructor(private rolService: RolService) {}
  ngOnInit(): void {
    this.getRols();
  }

  getRols() {
    this.cargando = true;
    this.rolService.getRecordList().subscribe({
      next: (resp: RolModel[]) => {
        console.log(resp);
        this.rolList = resp;
        this.cargando = false;
      },
    });
  }

  async saveRol() {
    const { value } = await Swal.fire<string>({
      title: 'Create Role',
      text: 'Ingrese name del Role',
      input: 'text',
      inputPlaceholder: 'name del Role',
      showCancelButton: true,
    });

    let name = value ?? '';
    let model = new RolModel(undefined, name);
    if (value?.trim().length! > 0) {
      this.rolService.saveRecord(model).subscribe((resp: any) => {
        console.log(resp);
        this.rolList = resp;
        Swal.fire('Creado', `role creado correctamente`, 'success');
        this.getRols();
      });
    }
  }

  async editRol(role: RolModel) {
    const inputValue = role.name;
    const { value: name } = await Swal.fire({
      title: 'Ingerese name',
      input: 'text',
      inputValue: inputValue,
      showCancelButton: true,
    });
    if (name) {
      console.log(name);
      let model = new RolModel(role.id, name);
      this.rolService.editRecord(model).subscribe((resp) => {
        Swal.fire('Actualizado', model.name, 'success');
        this.getRols();
      });
    }
  }
  deleteRol(role: RolModel) {
    Swal.fire({
      title: 'Borrar Role?',
      text: `Esta a punto de borrar al role ${role.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rolService.removeRecord(role.id!).subscribe((resp) => {
          Swal.fire(
            'Registo',
            `${role.name} eliminado correctamente`,
            'success'
          );
          this.getRols();
        });
      }
    });
  }
}
