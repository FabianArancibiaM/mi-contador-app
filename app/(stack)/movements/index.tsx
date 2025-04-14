import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { fetchMovements } from "../../../database/db";
import { Movement } from "@/core/movement/models/movement.model";
import { listTransactionsType } from "@/core/utils/util";

const MovementsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [movements, setMovements] = useState<Movement[]>([]);

  useEffect(() => {
    const loadMovements = async () => {
      try {
        const result: any = await fetchMovements();
        setMovements(result);
      } catch (error) {
        console.error("Error al cargar los movimientos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovements();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (movements.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noDataText}>Sin Información</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
                    (type) => type.value === item.movement
                  )?.type === "descuento"
                    ? "#f9724f"
                    : "#87bf75",
              },
            ]}
          >
            <Text style={styles.cell}>{item.description}</Text>
            <Text style={styles.cell}>{item.amount}</Text>
            <Text style={styles.cell}>{item.movement}</Text>
            <Text style={styles.cell}>
              {new Date(item.fecha).toLocaleDateString("es-ES")}
            </Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerCell}>Descripción</Text>
            <Text style={styles.headerCell}>Monto</Text>
            <Text style={styles.headerCell}>Movimiento</Text>
            <Text style={styles.headerCell}>Fecha</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#888",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
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

export default MovementsScreen;
