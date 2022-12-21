import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolModel } from 'src/app/models/security/Rol.model';
import { UserModel } from 'src/app/models/security/User.model';
import { ModalService } from 'src/app/services/general/modal.service';
import { FieldTypeService } from 'src/app/services/parameters/field-type.service';
import { RolService } from 'src/app/services/security/rol.service';
import { UserService } from 'src/app/services/security/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {
  closeResult: string = '';
  public cargando: boolean = true
  public userForm: FormGroup = new FormGroup({})
  public userList: UserModel[] = []
  public rolList: RolModel[] = []
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService,
    private generalServicel: ModalService,
    private rolService:RolService

  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['',[Validators.required]],
      role_id: ['']
    })

    this.getRolList()
    this.getUsers()
  }


  getUsers() {
    this.cargando = true
    this.userService.getRecordList().subscribe({
      next: ((resp: UserModel[]) => {
        // resp.forEach((element: any) => {
        //     console.log(element.field_types)
        // });
        console.log(resp)
        this.userList = resp
        this.cargando = false
      }),
      error: (err) => Swal.fire('error', 'No se pudieron obtener los registros', 'error')
    })
  }

  saveUser() {

    console.log(this.userForm.value)
    this.userService.saveRecord(this.userForm.value).subscribe({
      next: ((resp: any) => {
        console.log(resp)
        this.modalService.dismissAll('Successfully created Goal');
        Swal.fire('Creado', 'Usuario creado correctamente', 'success')
        this.getUsers()
      }),
      error: (err) => Swal.fire('error', 'No se pudo crear el registro', 'error')
    })
  }

  getRolList(){
    this.rolService.getRecordList().subscribe({
      next:((resp:RolModel[]) =>{
        this.rolList = resp
      }),
      error(err) {
          console.log(err)
      },
    })
  }

  removeUser(user: UserModel) {
    Swal.fire({
      title: 'Borrar Field?',
      text: `Esta a punto de borrar a ${user.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.removeRecord(user.id!).
          subscribe(resp => {
            Swal.fire('Registo', `${user.name} eliminado correctamente`, 'success')
            this.getUsers()
          })
      }
    })


  }



  open(content:any){
    this.modalService.open(content,{ariaLabelledBy:'modela-basic-title'}).result.then((result) =>{
      this.closeResult = `Closed with ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.generalServicel.getDismissReason(reason)}`
    })
  }




}
