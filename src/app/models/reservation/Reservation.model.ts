import { FieldModel } from "../parameters/Field.model";
import { TeamModel } from "../parameters/Team.model";

export class ReservationModel{
    constructor(
        public id?:BigInt,
        public field_id?:BigInt,
        public field?: FieldModel,
        public team_id?:BigInt,
        public team?:TeamModel,
        public estado?:string,
        public fechaReserva?: Date,
        public hora_inicio?:string,
        public hora_fin?:string

    ){

    }
}
