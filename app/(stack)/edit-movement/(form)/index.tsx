import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup";
import {
  AdjustmentEnum,
  ITransactionType,
} from "@/core/types/movement.interfaces";
import ThemedSpinner from "@/presentation/theme/components/ThemedSpinner";
import { formatMonto, listTransactionsType } from "@/core/utils/util";
import {
  fetchMovements,
  initDatabase,
  insertMovement,
  updateMovement,
} from "@/core/database/db";
import { Movement } from "@/core/models/movement.model";
import { IMovement, useMovementsStore } from "@/core/store/movementsStore";
import { router } from "expo-router";

// Simulación del servicio
const service = {
  getTypesMovement: () =>
    new Promise<ITransactionType[]>((resolve) => {
      setTimeout(() => {
        resolve(listTransactionsType);
      }, 2000); // Simula una espera de 2 segundos
    }),
};

const FormularioEditScreen = ({ data }: { data: Movement }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [listTypesMovement, setListTypesMovement] = useState<
    ITransactionType[]
  >([]);
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");
  const [subTitleForm, setSubTitleForm] = useState("");
  const [subTitleFormStyle, setSubTitleFormStyle] = useState({});
  const { setMovements } = useMovementsStore();

  useEffect(() => {
    const initializeDatabase = async () => {
      fetchTypesMovement();
    };

    initializeDatabase();
  }, []);

  // Llamar al "servicio" y actualizar el estado
  const fetchTypesMovement = async () => {
    try {
      const types = await service.getTypesMovement();
      setListTypesMovement(types);
    } catch (error) {
      console.error("Error al cargar los tipos de movimiento", error);
    } finally {
      setLoadingTypes(false);
    }
  };

  const initFomr = {
    description: data.description,
    amount: data.amount.toString(),
    date: new Date(data.date),
    pending: data.pending,
    typeMovement: data.typeMovement,
  };

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .min(3, "Debe tener al menos 3 caracteres")
      .required("El campo es obligatorio"),
    amount: Yup.string()
      .transform((value) => value.replace(/\./g, "")) // Quitar puntos antes de validar
      .test(
        "is-number",
        "El monto debe ser un número",
        (value) => !isNaN(Number(value))
      )
      .required("Campo requerido"),
    typeMovement: Yup.string().required("Campo requerido"),
    date: Yup.date().required("Campo requerido"),
    pending: Yup.boolean().required("Campo requerido"),
  });

  const defineTypeForm = (movementName: string) => {
    const findMovement = listTypesMovement.find(
      (data) => data.name === movementName
    );
    if (findMovement?.type === "") {
      return;
    }
    if (findMovement) {
      setSubTitleForm(
        findMovement.type === AdjustmentEnum.ABONO ? " Ingreso" : " Descuento"
      );
      setSubTitleFormStyle(
        findMovement.type === AdjustmentEnum.ABONO
          ? { color: "green" }
          : { color: "red" }
      );
    } else {
      setSubTitleForm("");
      setSubTitleFormStyle({});
    }
  };

  const saveForm = async (
    values: any,
    { resetForm }: { resetForm: () => void }
  ) => {
    const { description, amount, date, pending, typeMovement } = values;

    console.log({ description, amount, date, pending, typeMovement });

    const cleanAmount = amount.replace(/\D/g, "");

    if (description.length === 0 || amount.length === 0) {
      return;
    }

    const adjustment = listTypesMovement.find(
      (item) => item.value === typeMovement
    )?.type;
    console.log("ir a updateMovement");
    updateMovement(
      parseInt(data.id),
      description,
      cleanAmount,
      date.toISOString(),
      pending,
      adjustment || "",
      typeMovement
    ).then(async (res) => {
      console.log("Resultado de la actualización:", res);
      const movements = (await fetchMovements()) as IMovement[];
      if (Array.isArray(movements)) {
        setMovements(movements);
        router.push("/movements");
      }
    });
  };

  return (
    <Formik
      initialValues={initFomr}
      onSubmit={(values, actions) => saveForm(values, actions)}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        setFieldValue,
        errors,
        touched,
      }) => (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          {
            // Muestra un spinner mientras se cargan los datos
            loadingTypes ? (
              ThemedSpinner({ color: primaryColor })
            ) : (
              <ScrollView
                style={{
                  paddingHorizontal: 40,
                  backgroundColor: backgroundColor,
                }}
              >
                <View
                  style={{
                    paddingTop: 10,
                  }}
                >
                  <ThemedText type="title">Formulario</ThemedText>
                  <ThemedText type="subtitle" style={[subTitleFormStyle]}>
                    {subTitleForm}
                  </ThemedText>
                </View>

                <View style={{ marginTop: 20 }}>
                  {/* Descripción */}
                  <Text>Descripción:</Text>
                  <ThemedTextInput
                    placeholder="Ej: Compra de alimentos"
                    autoCapitalize="words"
                    icon="person-outline"
                    value={values.description}
                    onChangeText={(value) =>
                      setFieldValue("description", value)
                    }
                  />
                  {touched.description && errors.description && (
                    <Text style={styles.error}>{errors.description}</Text>
                  )}

                  {/* Monto */}
                  <Text>Monto:</Text>
                  <ThemedTextInput
                    placeholder="Ej: 100.000"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    icon="wallet-sharp"
                    value={values.amount}
                    onChangeText={(text) =>
                      setFieldValue("amount", formatMonto(text))
                    }
                  />
                  {touched.amount && errors.amount && (
                    <Text style={styles.error}>{errors.amount}</Text>
                  )}

                  {/* Movimiento */}
                  <Text>Movimiento:</Text>
                  <View
                    style={{
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 5,
                      marginTop: 1,
                      padding: 0,
                    }}
                  >
                    <Picker
                      selectedValue={values.typeMovement}
                      onValueChange={(selectedOption) => {
                        console.log(selectedOption);
                        defineTypeForm(selectedOption);
                        setFieldValue("typeMovement", selectedOption);
                      }}
                    >
                      {listTypesMovement.map((item) => (
                        <Picker.Item
                          key={item.id}
                          label={item.name}
                          value={item.value}
                          enabled={!item.disabled}
                        />
                      ))}
                    </Picker>
                  </View>
                  {touched.typeMovement && errors.typeMovement && (
                    <Text style={styles.error}>{errors.typeMovement}</Text>
                  )}

                  {/* Fecha - Muestra el calendario al tocar */}
                  <Text style={{ marginTop: 10 }}>Fecha:</Text>
                  <TouchableOpacity
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      padding: 10,
                      borderRadius: 5,
                      marginBottom: 10,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Ionicons
                      name="calendar"
                      size={24}
                      color="black"
                      style={{ marginRight: 10 }}
                    />
                    {!showDatePicker && (
                      <Text>{values.date.toLocaleDateString("es-ES")}</Text>
                    )}
                    {showDatePicker && (
                      <DateTimePicker
                        value={values.date}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                          setShowDatePicker(false);
                          setFieldValue(
                            "date",
                            new Date(event.nativeEvent.timestamp)
                          );
                          handleChange("date");
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  {touched.date && errors.date && (
                    <Text style={styles.error}>La Fecha es obligatoria</Text>
                  )}
                </View>

                {/* Spacer */}
                <View style={{ marginTop: 10 }} />

                {/* Botón */}
                <ThemedButton
                  icon="arrow-forward-outline"
                  onPress={handleSubmit}
                  disabled={isPosting}
                >
                  Editar
                </ThemedButton>
              </ScrollView>
            )
          }
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default FormularioEditScreen;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
