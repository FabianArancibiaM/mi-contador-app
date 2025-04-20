import { ActivityIndicator, StyleSheet, View } from "react-native";
interface SpinnerProps {
  loading: boolean;
}

const Spinner = ({ loading }: SpinnerProps) => {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    return null;
  }
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Spinner;
