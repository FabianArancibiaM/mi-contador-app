export class FinancialRecord {}
export class Movement {
  id: number;
  description: string;
  amount: number;
  movement: string;
  fecha: Date;
  isMovement: boolean;

  constructor(
    id: number,
    description: string,
    amount: number,
    movement: string,
    fecha: Date,
    isMovement: boolean
  ) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.movement = movement;
    this.fecha = fecha;
    this.isMovement = isMovement;
  }
}
