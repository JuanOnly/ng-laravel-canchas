export class ReservationModel {
  constructor(
    public id?: bigint,
    public team_id?: BigInt,
    public field_id?: BigInt,
    public date?: BigInt,
    public hour?: BigInt,
    public experation?: BigInt
  ) {}
}
