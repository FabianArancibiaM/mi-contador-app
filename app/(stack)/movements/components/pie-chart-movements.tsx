import { useMovementsStore } from "@/core/store/movementsStore";
import { formatMonto } from "@/core/utils/util";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const PieChartMovements = () => {
  const totals = useMovementsStore((state) => state.totals);

  const noData =
    isNaN(totals.abono) ||
    isNaN(totals.descuento) ||
    (totals.abono === 0 && totals.descuento === 0);

  if (noData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Aún no hay movimientos registrados</Text>
      </View>
    );
  }

  const chartData = [
    {
      name: "Disponible",
      amount: totals.abono,
      color: "#87bf75",
    },
    {
      name: "Gastos",
      amount: totals.descuento,
      color: "#f9724f",
    },
  ];

  const totalGlobal = totals.abono + totals.descuento;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Resumen General</Text>

      <PieChart
        data={chartData}
        width={screenWidth - 40}
        height={240}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"0"}
        center={[80, 0]}
        absolute
        hasLegend={false}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total: {formatMonto(totalGlobal.toString())}
        </Text>
      </View>

      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.circle, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PieChartMovements;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  totalContainer: {
    marginTop: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: "#555",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
  },
});
