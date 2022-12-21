import { RolModel } from './Rol.model';

export class UserModel {
  constructor(
    public id?: BigInt,
    public name?: string,
    public email?: string,
    public password?: string,
    public role_id?: BigInt,
    public role?: RolModel
  ) {}
}
