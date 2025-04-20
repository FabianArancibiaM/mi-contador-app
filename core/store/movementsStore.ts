import { create } from "zustand";
import { AdjustmentEnum } from "../types/movement.interfaces";

export interface IMovement {
  id: string;
  description: string; // descripcion
  amount: number; // monto
  pending: boolean; // se realizo el movimiento (true o false)
  adjustment: string; // abono o descuento
  date: string; // fecha
  typeMovement: string; // tipo de movimiento
}

interface Totals {
  abono: number;
  descuento: number;
}

interface MovementsState {
  movements: IMovement[];
  totals: Totals;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setMovements: (movements: IMovement[]) => void;
  calculateTotals: () => void;
}

export const useMovementsStore = create<MovementsState>((set, get) => ({
  movements: [],
  totals: { abono: 0, descuento: 0 },
  loading: true,
  setLoading: (loading) => set({ loading }),
  setMovements: (movements) => {
    set({ movements });
    get().calculateTotals(); // Calcular totales automáticamente al actualizar movimientos
  },
  calculateTotals: () => {
    const { movements } = get();
    const totalAbono = movements
      .filter((item) => {
        console.log("-> item.movement:", item.adjustment);
        return item.adjustment === AdjustmentEnum.ABONO;
      })
      .reduce((sum, item) => sum + parseFloat(item.amount.toString()), 0);

    const totalDescuento = movements
      .filter((item) => item.adjustment === AdjustmentEnum.DESCUENTO)
      .reduce((sum, item) => sum + parseFloat(item.amount.toString()), 0);

    set({ totals: { abono: totalAbono, descuento: totalDescuento } });
  },
}));
