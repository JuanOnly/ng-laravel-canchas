import { FieldTypeModel } from './FieldType.model';
import { LocationModel } from './Location.model';
export class FieldModel {
  constructor(
    public id?: bigint,
    public field_type?: string,
    public field_characteristic?: string,
    public field_location?: string
  ) {}
}
