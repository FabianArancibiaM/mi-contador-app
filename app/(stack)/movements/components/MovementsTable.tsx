import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Movement } from "@/core/models/movement.model";
import { formatMonto, listTransactionsType } from "@/core/utils/util";
import { useMovementsStore } from "@/core/store/movementsStore";
import { AdjustmentEnum } from "@/core/types/movement.interfaces";

interface MovementsTableProps {
  movements: Movement[];
}

const MovementsTable = () => {
  const { movements } = useMovementsStore();
  return (
    <FlatList
      data={movements}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={[
            styles.row,
            {
              backgroundColor:
                listTransactionsType.find(
                  (type) => type.value === item.typeMovement
                )?.type === AdjustmentEnum.DESCUENTO
                  ? "#f9724f"
                  : "#87bf75",
            },
          ]}
        >
          <Text style={styles.cell}>{item.description}</Text>
          <Text style={styles.cell}>{formatMonto(item.amount.toString())}</Text>
          <Text style={styles.cell}>
            {
              listTransactionsType.find(
                (type) => type.value === item.typeMovement
              )?.name
            }
          </Text>
          <Text style={styles.cell}>
            {new Date(item.date).toLocaleDateString("es-ES")}
          </Text>
        </View>
      )}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.headerCell}>Descripción</Text>
          <Text style={styles.headerCell}>Monto</Text>
          <Text style={styles.headerCell}>Movimiento</Text>
          <Text style={styles.headerCell}>Fecha</Text>
          <Text style={styles.headerCell}></Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default MovementsTable;
