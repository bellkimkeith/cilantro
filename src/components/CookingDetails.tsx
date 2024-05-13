import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";

type CookingDetailsProp = {
  time: number;
};

const CookingDetails = ({ time }: CookingDetailsProp) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cooking Time</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}m</Text>
        <FontAwesome6 name="clock" size={24} color="#000" />
      </View>
    </View>
  );
};

export default CookingDetails;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#ACE1AF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timeText: {
    fontSize: 20,
  },
});
