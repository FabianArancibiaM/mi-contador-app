import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Movement } from "@/core/models/movement.model";
import { formatMonto, listTransactionsType } from "@/core/utils/util";
import { useMovementsStore } from "@/core/store/movementsStore";
import { AdjustmentEnum } from "@/core/types/movement.interfaces";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const MovementsTable = () => {
  const { movements } = useMovementsStore();
  const [selectedItem, setSelectedItem] = useState<Movement | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleRowPress = (item: Movement) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleEdit = () => {
    if (selectedItem) {
      router.push({
        pathname: "/edit-movement",
        params: { id: selectedItem.id },
      });
    }
    setModalVisible(false);
  };

  const handleDelete = () => {
    console.log("Eliminar:", selectedItem);
    setModalVisible(false);
  };

  const getColorByType = (type: string) => {
    const t = listTransactionsType.find((item) => item.value === type);
    return t?.type === AdjustmentEnum.DESCUENTO ? "#ffe2e0" : "#e1f3e0";
  };

  const getIconByType = (type: string) => {
    const t = listTransactionsType.find((item) => item.value === type);
    if (t?.type === AdjustmentEnum.DESCUENTO) return "remove-circle";
    if (t?.type === AdjustmentEnum.ABONO) return "add-circle";
    return "help-circle";
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={movements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const typeData = listTransactionsType.find(
            (t) => t.value === item.typeMovement
          );
          return (
            <TouchableOpacity onPress={() => handleRowPress(item)}>
              <View
                style={[
                  styles.row,
                  { backgroundColor: getColorByType(item.typeMovement) },
                ]}
              >
                <Ionicons
                  name={getIconByType(item.typeMovement)}
                  size={22}
                  style={styles.icon}
                  color={
                    typeData?.type === AdjustmentEnum.ABONO ? "green" : "red"
                  }
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.desc}>{item.description}</Text>
                  <Text style={styles.date}>
                    {new Date(item.date).toLocaleDateString("es-ES")}
                  </Text>
                </View>
                <View style={styles.amountContainer}>
                  <Text style={styles.amount}>
                    {formatMonto(item.amount.toString())}
                  </Text>
                  <Text style={styles.badge}>
                    {typeData?.name || "Tipo desconocido"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>Movimientos Registrados</Text>
          </View>
        )}
      />

      {/* Modal de acciones */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>Detalles</Text>
                <Text>Descripción: {selectedItem.description}</Text>
                <Text>
                  Monto: {formatMonto(selectedItem.amount.toString())}
                </Text>
                <Text>
                  Fecha:{" "}
                  {new Date(selectedItem.date).toLocaleDateString("es-ES")}
                </Text>
                <Text>Tipo: {selectedItem.typeMovement}</Text>
                <Text>
                  Estado: {selectedItem.pending ? "Pendiente" : "Realizado"}
                </Text>
              </>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleEdit} style={styles.modalButton}>
                <Text>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={[styles.modalButton, { backgroundColor: "#ff4f4f" }]}
              >
                <Text style={{ color: "#fff" }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.close}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MovementsTable;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  infoContainer: {
    flex: 2,
  },
  amountContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  desc: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    color: "#555",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  badge: {
    backgroundColor: "#ddd",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  close: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
});
