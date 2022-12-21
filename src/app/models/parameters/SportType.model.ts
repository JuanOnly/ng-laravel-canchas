import { FieldModel } from "./Field.model";

export class SportTypeModel{

  constructor(
    public id?:bigint,
    public rating?: BigInt,
    public comment?:string,
    public field_id?: bigint,
    public field?: FieldModel
  )
  {}
}
