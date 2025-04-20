export const listTransactionsType = [
  {
    id: 0,
    name: "Seleccionar Movimiento",
    value: "",
    type: "",
    disabled: true,
  },
  {
    id: 1,
    name: "Transferencia",
    value: "transferencia",
    type: "abono",
  },
  { id: 2, name: "Gastos", value: "gastos", type: "descuento" },
  { id: 3, name: "Préstamo", value: "prestamo", type: "abono" },
];

// Formatear monto con puntos (miles)
export const formatMonto = (value: string) => {
  const numericValue = value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Agregar puntos cada 3 dígitos
};
