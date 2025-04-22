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
import {
  categorias,
  formatMonto,
  listTransactionsType,
  mediosPago,
} from "@/core/utils/util";
import {
  fetchMovements,
  initDatabase,
  insertMovement,
} from "@/core/database/db";

const service = {
  getTypesMovement: () =>
    new Promise<ITransactionType[]>((resolve) => {
      setTimeout(() => {
        resolve(listTransactionsType);
      }, 2000);
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
    const initializeDatabase = async () => {
      const res = await initDatabase();
      if (res) {
        const movements = await fetchMovements();
        fetchTypesMovement();
      }
    };

    initializeDatabase();
  }, []);

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
    date: new Date(),
    pending: true,
    typeMovement: "",
    category: "",
    paymentMethod: "",
    notes: "",
    recurring: false,
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .min(3, "Debe tener al menos 3 caracteres")
      .required("El campo es obligatorio"),
    amount: Yup.string()
      .transform((value) => value.replace(/\./g, ""))
      .test(
        "is-number",
        "El monto debe ser un número",
        (value) => !isNaN(Number(value))
      )
      .required("Campo requerido"),
    typeMovement: Yup.string().required("Campo requerido"),
    date: Yup.date().required("Campo requerido"),
    pending: Yup.boolean().required("Campo requerido"),
    category: Yup.string().required("Campo requerido"),
    paymentMethod: Yup.string().required("Campo requerido"),
  });

  const defineTypeForm = (movementName: string) => {
    const findMovement = listTypesMovement.find(
      (data) => data.name === movementName
    );
    if (findMovement?.type === "") return;
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
    const {
      description,
      amount,
      date,
      pending,
      typeMovement,
      category,
      paymentMethod,
      notes,
      recurring,
    } = values;

    const cleanAmount = amount.replace(/\D/g, "");

    if (description.length === 0 || amount.length === 0) {
      return;
    }

    const adjustment = listTypesMovement.find(
      (item) => item.value === typeMovement
    )?.type;

    insertMovement(
      description,
      cleanAmount,
      date.toISOString(),
      pending,
      adjustment || "",
      typeMovement,
      category,
      paymentMethod,
      notes,
      recurring
    ).then(() => {
      resetForm();
      setIsPosting(false);
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
          {loadingTypes ? (
            <ThemedSpinner color={primaryColor} />
          ) : (
            <ScrollView
              style={{
                paddingHorizontal: 30,
                backgroundColor: backgroundColor,
              }}
            >
              <View style={styles.titleContainer}>
                <ThemedText type="title">Formulario</ThemedText>
                <ThemedText type="subtitle" style={[subTitleFormStyle]}>
                  {subTitleForm}
                </ThemedText>
              </View>

              <View style={styles.formContainer}>
                {/* Descripción */}
                <Text style={styles.label}>Descripción:</Text>
                <ThemedTextInput
                  placeholder="Ej: Compra de alimentos"
                  autoCapitalize="words"
                  icon="person-outline"
                  value={values.description}
                  onChangeText={(value) => setFieldValue("description", value)}
                />
                {touched.description && errors.description && (
                  <Text style={styles.error}>{errors.description}</Text>
                )}

                {/* Monto */}
                <Text style={styles.label}>Monto:</Text>
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
                <Text style={styles.label}>Movimiento:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.typeMovement}
                    onValueChange={(selectedOption) => {
                      defineTypeForm(selectedOption);
                      setFieldValue("typeMovement", selectedOption);
                    }}
                  >
                    <Picker.Item
                      label="Seleccionar Movimiento"
                      value=""
                      enabled={false}
                    />
                    {listTypesMovement.map((item) => (
                      <Picker.Item
                        key={item.id}
                        label={item.name}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                </View>
                {touched.typeMovement && errors.typeMovement && (
                  <Text style={styles.error}>{errors.typeMovement}</Text>
                )}

                {/* Fecha */}
                <Text style={styles.label}>Fecha:</Text>
                <TouchableOpacity
                  style={styles.datePicker}
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

                <Text style={styles.label}>Categoría:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.category}
                    onValueChange={(value) => setFieldValue("category", value)}
                  >
                    <Picker.Item label="Selecciona una categoría" value="" />
                    {categorias.map((cat, index) => (
                      <Picker.Item key={index} label={cat} value={cat} />
                    ))}
                  </Picker>
                </View>
                {touched.category && errors.category && (
                  <Text style={styles.error}>{errors.category}</Text>
                )}

                <Text style={styles.label}>Medio de pago:</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.paymentMethod}
                    onValueChange={(value) =>
                      setFieldValue("paymentMethod", value)
                    }
                  >
                    <Picker.Item label="Selecciona un método" value="" />
                    {mediosPago.map((medio, index) => (
                      <Picker.Item key={index} label={medio} value={medio} />
                    ))}
                  </Picker>
                </View>
                {touched.paymentMethod && errors.paymentMethod && (
                  <Text style={styles.error}>{errors.paymentMethod}</Text>
                )}

                <Text style={styles.label}>Notas:</Text>
                <ThemedTextInput
                  placeholder="Detalles adicionales"
                  icon="document-text-outline"
                  value={values.notes}
                  onChangeText={(value) => setFieldValue("notes", value)}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text>¿Gasto recurrente?</Text>
                  <Switch
                    value={values.recurring}
                    onValueChange={(val) => {
                      setFieldValue("recurring", val);
                    }}
                    trackColor={{ false: "#ccc", true: primaryColor }}
                    thumbColor={values.recurring ? "#fff" : "#f4f3f4"}
                    style={{ marginLeft: 10 }}
                  />
                </View>
              </View>

              <ThemedButton
                icon="arrow-forward-outline"
                onPress={handleSubmit}
                disabled={isPosting}
                style={styles.submitButton}
              >
                Guardar
              </ThemedButton>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
});

export default FormularioScreen;
