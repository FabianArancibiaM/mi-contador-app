import { useSearchParams } from "expo-router/build/hooks";
import FormularioEditScreen from "./(form)";
import { StyleSheet, Text, View } from "react-native";
import { IMovement, useMovementsStore } from "@/core/store/movementsStore";
import { useEffect, useState } from "react";
import { Movement } from "@/core/models/movement.model";
import Spinner from "@/components/shared/Spinner";

const EditMovement = () => {
  const params = useSearchParams();
  const { movements } = useMovementsStore();
  const [movement, setMovement] = useState<Movement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const id = params.get("id");
    const foundMovement = movements.find(
      (data) => data.id.toString() === id?.toString()
    );
    if (foundMovement) {
      setMovement(foundMovement);
      setLoading(false);
    } else {
      console.log("Movimiento no encontrado");
    }
  }, []);

  if (movement === null) return <Spinner loading={loading} />;

  return <FormularioEditScreen data={movement} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default EditMovement;
