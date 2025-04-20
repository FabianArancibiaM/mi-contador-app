export interface ITransactionType {
  id: number;
  name: string;
  value: string;
  type: string;
  disabled?: boolean;
}

export enum AdjustmentEnum {
  ABONO = "abono",
  DESCUENTO = "descuento",
}
