import { AdjustmentEnum } from "@/core/types/movement.interfaces";

export const getMovementInfo = (value: string) => {
  switch (value) {
    case "transferencia":
      return {
        name: "Transferencia",
        color: "#87bf75",
        type: AdjustmentEnum.ABONO,
      };
    case "gastos":
      return {
        name: "Gastos",
        color: "#f9724f",
        type: AdjustmentEnum.DESCUENTO,
      };
    case "prestamo":
      return { name: "Préstamo", color: "#87bf75", type: AdjustmentEnum.ABONO };
    default:
      return { name: "Desconocido", color: "#ccc", type: "" };
  }
};
