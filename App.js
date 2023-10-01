import React from "react";
import { View, StyleSheet } from "react-native";
import BMICalculator from "./Components/BMICalculator";

const App = () => {
  return (
    <View style={styles.container}>
      <BMICalculator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
