import { AdjustmentEnum } from "../types/movement.interfaces";

export const listTransactionsType = [
  {
    id: 1,
    name: "Transferencia",
    value: "transferencia",
    type: AdjustmentEnum.ABONO,
    defaultCategory: "Finanzas",
  },
  {
    id: 2,
    name: "Gastos",
    value: "gastos",
    type: AdjustmentEnum.DESCUENTO,
    defaultCategory: "Otros",
  },
  {
    id: 3,
    name: "Préstamo",
    value: "prestamo",
    type: AdjustmentEnum.ABONO,
    defaultCategory: "Finanzas",
  },
];

export const categorias = [
  "Alimentación",
  "Transporte",
  "Salud",
  "Hogar",
  "Ocio",
  "Ropa",
  "Educación",
  "Finanzas",
  "Otros",
];

export const mediosPago = ["Efectivo", "Débito", "Crédito", "Transferencia"];

// Formatear monto con puntos (miles)
export const formatMonto = (value: string) => {
  const numericValue = value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Agregar puntos cada 3 dígitos
};
