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
import { ITransactionType } from "@/core/movement/types/movement.interfaces";
import ThemedSpinner from "@/presentation/theme/components/ThemedSpinner";

// Simulación del servicio
const service = {
  getTypesMovement: () =>
    new Promise<ITransactionType[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 0,
            name: "Seleccionar Movimiento",
            value: "",
            type: "",
            disabled: true,
          },
          {
            id: 1,
            name: "Transferencia",
            value: "transferencia",
            type: "abono",
          },
          { id: 2, name: "Gastos", value: "gastos", type: "descuento" },
          { id: 3, name: "Préstamo", value: "prestamo", type: "abono" },
        ]);
      }, 2000); // Simula una espera de 2 segundos
    }),
};

const FormularioScreen = () => {
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

  useEffect(() => {
    fetchTypesMovement();
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
    description: "",
    amount: "",
    movement: "",
    fecha: new Date(),
    isMovement: true,
  };

  // Formatear monto con puntos (miles)
  const formatMonto = (value: string) => {
    const numericValue = value.replace(/\D/g, ""); // Eliminar caracteres no numéricos
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Agregar puntos cada 3 dígitos
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
      .required("El monto es obligatorio"),
    movement: Yup.string().required("La contraseña es obligatoria"),
    fecha: Yup.date().required("La Fecha es obligatoria"),
    isMovement: Yup.boolean().required("La contraseña es obligatoria"),
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
        findMovement.type === "abono" ? " Ingreso" : " Descuento"
      );
      setSubTitleFormStyle(
        findMovement.type === "abono" ? { color: "green" } : { color: "red" }
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
    const { description, amount, movement, fecha, isMovement } = values;

    console.log({ description, amount, movement, fecha, isMovement });

    if (description.length === 0 || amount.length === 0) {
      return;
    }
    resetForm();
    // setIsPosting(true);
    setIsPosting(false);
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
                      selectedValue={values.movement}
                      onValueChange={(selectedOption) => {
                        console.log(values.movement);
                        defineTypeForm(selectedOption);
                        setFieldValue("movement", selectedOption);
                      }}
                    >
                      {listTypesMovement.map((item) => (
                        <Picker.Item
                          key={item.id}
                          label={item.name}
                          value={item.name}
                          enabled={!item.disabled}
                        />
                      ))}
                    </Picker>
                  </View>
                  {touched.movement && errors.movement && (
                    <Text style={styles.error}>{errors.movement}</Text>
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
                      <Text>{values.fecha.toLocaleDateString("es-ES")}</Text>
                    )}
                    {showDatePicker && (
                      <DateTimePicker
                        value={values.fecha}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                          setShowDatePicker(false);
                          setFieldValue(
                            "fecha",
                            new Date(event.nativeEvent.timestamp)
                          );
                          handleChange("fecha");
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  {touched.fecha && errors.fecha && (
                    <Text style={styles.error}>La Fecha es obligatoria</Text>
                  )}

                  {/* <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                    }}
                  >
                    {values.isMovement ? (
                      <Text
                        style={{
                          position: "absolute",
                          color: "white",
                          top: 15,
                          left: 42,
                          zIndex: 5,
                          fontSize: 15,
                        }}
                      >
                        Sí
                      </Text>
                    ) : (
                      <Text
                        style={{
                          position: "absolute",
                          color: "white",
                          top: 15,
                          left: 10,
                          zIndex: 5,
                          fontSize: 15,
                        }}
                      >
                        No
                      </Text>
                    )}
                    <Switch
                      trackColor={{ false: "red", true: "gray" }} // Color del fondo
                      thumbColor={values.isMovement ? "blue" : "red"} // Color del botón
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => {
                        setFieldValue("isMovement", !values.isMovement);
                      }}
                      value={values.isMovement}
                      style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                    />
                    <Text
                      style={{ marginLeft: 18 }}
                      onPress={() => {
                        setFieldValue("isMovement", !values.isMovement);
                      }}
                    >
                      Movimiento realizado
                    </Text>
                  </View> */}
                </View>

                {/* Spacer */}
                <View style={{ marginTop: 10 }} />

                {/* Botón */}
                <ThemedButton
                  icon="arrow-forward-outline"
                  onPress={handleSubmit}
                  disabled={isPosting}
                >
                  Guardar
                </ThemedButton>
              </ScrollView>
            )
          }
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default FormularioScreen;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
