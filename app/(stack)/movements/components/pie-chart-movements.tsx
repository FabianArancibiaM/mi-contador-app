import { useMovementsStore } from "@/core/store/movementsStore";
import { formatMonto } from "@/core/utils/util";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

const PieChartMovements = () => {
  const totals = useMovementsStore((state) => state.totals); // Selector para suscribirse a `totals`
  if (isNaN(totals.abono) || isNaN(totals.descuento)) {
    return <Text>Sin Data</Text>;
  }

  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={[
          {
            name: "Abono",
            amount: formatMonto(totals.abono.toString()),
            color: "#87bf75",
          },
          {
            name: "Descuento",
            amount: formatMonto(totals.descuento.toString()),
            color: "#f9724f",
          },
        ]}
        width={screenWidth}
        height={250}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"100"}
        absolute
        center={[0, 0]}
        hasLegend={false}
      />
      {/* Leyenda con círculos */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.circle, { backgroundColor: "#87bf75" }]} />
          <Text style={styles.legendText}>Disponible</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.circle, { backgroundColor: "#f9724f" }]} />
          <Text style={styles.legendText}>Gastos</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    justifyContent: "center", // Centrar verticalmente
    alignItems: "center", // Centrar horizontalmente
    marginBottom: 100,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: "#000",
  },
});
export default PieChartMovements;
