export class FinancialRecord {}
export class Movement {
  id: string;
  description: string; // descripcion
  amount: number; // monto
  pending: boolean; // se realizo el movimiento (true o false)
  adjustment: string; // abono o descuento
  date: string; // fecha
  typeMovement: string; // tipo de movimiento

  constructor() {
    this.id = "";
    this.description = "";
    this.amount = 0;
    this.pending = false;
    this.adjustment = "";
    this.date = "";
    this.typeMovement = "";
  }

  // constructor(
  //   id: string,
  //   description: string,
  //   amount: number,
  //   pending: boolean,
  //   adjustment: string,
  //   date: string,
  //   typeMovement: string
  // ) {
  //   this.id = id;
  //   this.description = description;
  //   this.amount = amount;
  //   this.pending = pending;
  //   this.adjustment = adjustment;
  //   this.date = date;
  //   this.typeMovement = typeMovement;
  // }
}
