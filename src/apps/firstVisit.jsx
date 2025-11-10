import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./firstVisit.styles";

export default function FirstVisit() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>무엇을 하러 오셨나요?</Text>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🍞 음식 나눠줄래요</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonTextSecondary}>🙋 음식 받고 싶어요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
