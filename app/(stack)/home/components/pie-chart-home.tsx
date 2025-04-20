import { formatMonto } from "@/core/utils/util";
import { useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

const PieChartHome = (totals: { abono: number; descuento: number }) => {
  if (
    isNaN(totals.abono) ||
    isNaN(totals.descuento) ||
    totals.abono === 0 ||
    totals.descuento === 0
  ) {
    return <View></View>;
  }
  return (
    <PieChart
      data={[
        {
          name: "Abono",
          amount: totals.abono, //formatMonto(totals.abono.toString()),
          color: "#87bf75",
        },
        {
          name: "Descuento",
          amount: totals.descuento, // formatMonto(totals.descuento.toString()),
          color: "#f9724f",
        },
      ]}
      width={screenWidth}
      height={200}
      chartConfig={{
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
      }}
      accessor={"amount"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      absolute
      center={[50, 0]}
      hasLegend={false}
    />
  );
};
export default PieChartHome;
