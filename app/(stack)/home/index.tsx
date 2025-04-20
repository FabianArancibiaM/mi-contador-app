import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../components/shared/CustomButton";
import Card from "../../../components/shared/CustomCard";

import { ImageAssets } from "../../../assets/image";
import { colors } from "../../../assets/styles/globalStyles";

import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import Screen from "../../../components/shared/Screen";
import PieChartHome from "./components/pie-chart-home";
import Spinner from "@/components/shared/Spinner";
import { useEffect, useState } from "react";
import { fetchMovements } from "@/core/database/db";
import { Movement } from "@/core/models/movement.model";
import { listTransactionsType } from "@/core/utils/util";
import { useMovementsStore } from "@/core/store/movementsStore";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const { totals, loading, setLoading, setMovements } = useMovementsStore();

  const menuList = [
    { title: " Movimiento", icon: ImageAssets.add, route: "/movements" },
    { title: "Products", icon: ImageAssets.add, route: "/products" },
    {
      title: "Agregar Movimiento",
      icon: ImageAssets.add,
      route: "/add-movement",
    },
    {
      title: "Agregar Movimiento",
      icon: ImageAssets.add,
      route: "/add-movement",
    },
    {
      title: "Agregar Movimiento",
      icon: ImageAssets.add,
      route: "/add-movement",
    },
    {
      title: "Agregar Movimiento",
      icon: ImageAssets.add,
      route: "/add-movement",
    },
  ];

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

  if (loading) return <Spinner loading={loading} />;

  return (
    <Screen>
      <CardDetails abono={totals.abono} descuento={totals.descuento} />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          {menuList.map((menu, index) => (
            <Menu
              key={index}
              title={menu.title}
              image={menu.icon}
              route={menu.route}
            />
          ))}
        </View>
      </ScrollView>
      <Link href="/products" asChild>
        <CustomButton variant="text-only" className="mb-10" color="primary">
          Productos
        </CustomButton>
      </Link>
    </Screen>
  );
};

const Menu = ({
  title,
  image,
  route,
}: {
  title: string;
  image: any; // Replace 'any' with the specific type of your image if known
  route: string;
}) => {
  return (
    <TouchableOpacity
      style={stylesCardMenu.cardContainer}
      onPress={() => router.push(route)}
    >
      <Image source={image} style={stylesCardMenu.cardImage} />
      <Text style={stylesCardMenu.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const stylesCardMenu = StyleSheet.create({
  cardContainer: {
    width: "48%", // Para hacer 2 columnas por fila
    height: 100,
    backgroundColor: colors.base2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 8,
    padding: 5,
  },
  cardImage: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "WorkSans-Medium",
  },
});

const CardDetails = (totals: { abono: number; descuento: number }) => {
  const info = {
    earnings: 23000,
    expense: 4322,
  };

  return (
    <View style={stylesCardDetails.cardContainer}>
      <PieChartHome
        abono={totals.abono}
        descuento={totals.descuento}
      ></PieChartHome>
      <Text style={stylesCardDetails.cardTitle}>Balance General</Text>
      <View style={stylesCardDetails.cardDetails}>
        <Image
          source={ImageAssets.contador}
          style={stylesCardDetails.cardImage}
        />
        <View style={stylesCardDetails.cardInfoDetails}>
          <Text style={stylesCardDetails.cardField}>Total</Text>
          <Text style={stylesCardDetails.cardField}>Abonos</Text>
          <Text style={stylesCardDetails.cardField}>Descuentos</Text>
        </View>
        <View style={stylesCardDetails.cardInfoDetails}>
          <Text style={stylesCardDetails.cardvalue}>
            $ {(totals.abono - totals.descuento).toLocaleString("es-ES")}.-
          </Text>
          <Text style={stylesCardDetails.cardvalue}>
            $ {totals.abono.toLocaleString("es-ES")}.-
          </Text>
          <Text style={stylesCardDetails.cardvalue}>
            $ {totals.descuento.toLocaleString("es-ES")}.-
          </Text>
        </View>
      </View>
    </View>
  );
};
const stylesCardDetails = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.base2,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombras en Android
    margin: 10,
    padding: 10,
    overflow: "hidden", // Para que los bordes redondeados funcionen con la imagen
  },
  cardImage: {
    width: "20%",
    height: "100%",
    resizeMode: "contain",
  },
  cardDetails: {
    display: "flex",
    flexDirection: "row",
  },
  cardInfoDetails: { paddingLeft: 10 },
  cardTitle: {
    textAlign: "center",
    fontSize: 32,
    marginBottom: 10,
    fontFamily: "WorkSans-Black",
  },
  cardField: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: "WorkSans-Light",
  },
  cardvalue: {
    fontSize: 20,
    marginBottom: 5,
    fontFamily: "WorkSans-Medium",
  },
});

export default HomeScreen;
