import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [measurementSystem, setMeasurementSystem] = useState("SI");
  const [bmi, setBMI] = useState("");
  const [bmiCategory, setBMICategory] = useState("");

  const calculateBMI = () => {
    // Convert weight and height based on the selected measurement system
    let weightInKg = parseFloat(weight);
    let heightInM =
      parseFloat(height) / (measurementSystem === "SI" ? 100 : 39.37);

    if (measurementSystem === "Imperial") {
      weightInKg *= 0.453592; // Convert lb to kg
    }

    // Calculate BMI
    const bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(2);

    // Determine BMI category
    let category = "";
    if (bmiValue < 18.5) {
      category = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      category = "Normal Weight";
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      category = "Overweight";
    } else if (bmiValue >= 30) {
      category = "Obesity";
    } else {
      category = "Check Inputs";
    }

    // Set BMI and category
    setBMI(bmiValue);
    setBMICategory(category);
  };

  const toggleMeasurementSystem = () => {
    // Toggle between SI and Imperial measurement systems
    const newSystem = measurementSystem === "SI" ? "Imperial" : "SI";
    setMeasurementSystem(newSystem);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingTop: 70,
          paddingBottom: 40,
        }}
      >
        <Button
          title="Standard (SI)"
          color={"green"}
          onPress={() => setMeasurementSystem("SI")}
          disabled={measurementSystem === "SI"}
        />
        <Button
          title="Metric (Imperial)"
          color={"orange"}
          onPress={() => setMeasurementSystem("Imperial")}
          disabled={measurementSystem === "Imperial"}
        />
      </View>

      {
        <Text style={styles.weight}>
          Weight ({measurementSystem === "SI" ? "kg" : "lb"}):
        </Text>
      }

      <TextInput
        style={styles.placeholderWeight}
        placeholder={`Enter weight in ${
          measurementSystem === "SI" ? "kg" : "lb"
        }`}
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />

      <Text style={styles.height}>
        Height ({measurementSystem === "SI" ? "cm" : "in"}):
      </Text>
      <TextInput
        style={styles.placeholderHeight}
        placeholder={`Enter height in ${
          measurementSystem === "SI" ? "cm" : "in"
        }`}
        value={height}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />

      <Button title="Calculate BMI" onPress={calculateBMI} />

      <Text style={styles.showBMI}>BMI: {bmi}</Text>
      <Text style={styles.showCategory}>Category: {bmiCategory}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weight: {
    // textAlign: "center",
    // marginBottom: 50,
    fontSize: 14,
    fontWeight: "bold",
    padding: 4,
  },
  placeholderWeight: {
    paddingBottom: 20,
  },
  height: {
    // textAlign: "center",
    // marginBottom: 50,
    fontSize: 14,
    fontWeight: "bold",
    padding: 4,
  },
  placeholderHeight: {
    paddingBottom: 20,
  },
  showBMI: {
    fontSize: 20,
    fontStyle: "italic",
    color: "red",
  },
  showCategory: {
    fontSize: 20,
    fontStyle: "italic",
    color: "orange",
  },
});
