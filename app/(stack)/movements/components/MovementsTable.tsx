import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
import { Movement } from "@/core/models/movement.model";
import { formatMonto, listTransactionsType } from "@/core/utils/util";
import { useMovementsStore } from "@/core/store/movementsStore";
import { AdjustmentEnum } from "@/core/types/movement.interfaces";
import { router } from "expo-router";

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
      // Navegar a la página "/edit-movement" con los datos del item seleccionado
      console.log("Editar:", selectedItem);
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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={movements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRowPress(item)}>
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
              <Text style={styles.cell}>
                {formatMonto(item.amount.toString())}
              </Text>
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
          </TouchableOpacity>
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

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una opción</Text>
            <View style={styles.buttonContainer}>
              <Button title="Editar" onPress={handleEdit} />
              <Button title="Eliminar" onPress={handleDelete} color="red" />
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default MovementsTable;
