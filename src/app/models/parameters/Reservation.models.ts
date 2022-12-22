export class ReservationModel {
  constructor(
    public id: BigInt,
    public team_id: BigInt,
    public field_id: BigInt,
    public date: BigInt,
    public hour: BigInt,
    public experation: BigInt
  ) {}
}
