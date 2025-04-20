import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchMovements } from "../../../core/database/db";
import MovementsTable from "./components/MovementsTable";
import PieChartMovements from "./components/pie-chart-movements";
import Spinner from "@/components/shared/Spinner";
import { useMovementsStore } from "@/core/store/movementsStore";

const MovementsScreen = () => {
  const { movements, loading, setLoading, setMovements } = useMovementsStore();

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

  <Spinner loading={loading} />;

  if (movements.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noDataText}>Sin Información</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Resumen de Movimientos</Text>

      {/* Gráfico de torta */}
      <PieChartMovements />

      {/* Tabla de movimientos */}
      <MovementsTable />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    color: "#333",
  },
});

export default MovementsScreen;
