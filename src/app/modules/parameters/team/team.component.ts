import { Component, OnInit } from '@angular/core';
import { TeamModel } from 'src/app/models/parameters/Team.model';
import { TeamService } from 'src/app/services/parameters/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  public teamList: TeamModel[] = [];
  public cargando: boolean = true;

  constructor(private teamService: TeamService) {}
  ngOnInit(): void {
    this.obtenerTeam();
  }

  obtenerTeam() {
    this.cargando = true;
    this.teamService.getRecords().subscribe({
      next: (resp: TeamModel[]) => {
        console.log(resp);
        this.teamList = resp;
        this.cargando = false;
      },
    });
  }

  async editarTeam(team: TeamModel) {
    const ipAPI = '//api.ipify.org?format=json';

    const inputValue = team.name;

    const { value: name } = await Swal.fire({
      title: 'Ingerese name',
      input: 'text',
      inputValue: inputValue,
      showCancelButton: true,
    });
    if (name) {
      console.log(name);
      let model = new TeamModel(team.id, name);
      this.teamService.editRecord(model).subscribe((resp) => {
        Swal.fire('Actualizado', model.name, 'success');
        this.obtenerTeam();
      });
    }
  }
  async crearTeam() {
    const { value } = await Swal.fire<string>({
      title: 'Crear Equipo',
      text: 'Ingrese name de equipo',
      input: 'text',
      inputPlaceholder: 'name Equipo',
      showCancelButton: true,
    });

    let name = value ?? '';
    let team = new TeamModel(undefined, name);
    if (value?.trim().length! > 0) {
      this.teamService.saveRecord(team).subscribe((resp: any) => {
        console.log(resp);
        this.teamList = resp;
        Swal.fire('Creado', `team creado correctamente`, 'success');
        this.obtenerTeam();
      });
    }
  }

  eliminarTeam(team: TeamModel) {
    Swal.fire({
      title: 'Delete team?',
      text: `Esta a punto de borrar al team ${team.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.teamService.removeRecord(team).subscribe((resp) => {
          Swal.fire(
            'Registo',
            `${team.name} eliminado correctamente`,
            'success'
          );
          this.obtenerTeam();
        });
      }
    });
  }
}
