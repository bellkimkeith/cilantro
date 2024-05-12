import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Hits } from "../utils/Types";

const NutrientDetails = ({ recipe, _links }: Hits) => {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.overViewDetailsContainer}>
        <Text style={styles.headerText}>{recipe.label}</Text>
        <Text style={styles.subText}>{recipe.source}</Text>
      </View>
      <View style={styles.nutrientsContainer}>
        <View style={styles.nutrientsSubContainer}>
          <View style={styles.nutrientItemContainer}>
            <View style={styles.icon}>
              <FontAwesome5 name="fire-alt" size={28} color="#777" />
            </View>
            <Text
              style={styles.nutrientText}
            >{`${recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(0)} ${
              recipe.totalNutrients.ENERC_KCAL.unit
            }`}</Text>
          </View>
          <View style={styles.nutrientItemContainer}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="food-steak"
                size={28}
                color="#777"
              />
            </View>
            <Text
              style={styles.nutrientText}
            >{`${recipe.totalNutrients.PROCNT.quantity.toFixed(0)}${
              recipe.totalNutrients.PROCNT.unit
            } ${recipe.totalNutrients.PROCNT.label}`}</Text>
          </View>
        </View>
        <View style={styles.nutrientsSubContainer}>
          <View style={styles.nutrientItemContainer}>
            <View style={styles.icon}>
              <FontAwesome6 name="pizza-slice" size={28} color="#777" />
            </View>
            <Text
              style={styles.nutrientText}
            >{`${recipe.totalNutrients.FAT.quantity.toFixed(0)}${
              recipe.totalNutrients.FAT.unit
            } ${recipe.totalNutrients.FAT.label}`}</Text>
          </View>
          <View style={styles.nutrientItemContainer}>
            <View style={styles.icon}>
              <FontAwesome6 name="wheat-awn" size={28} color="#777" />
            </View>
            <Text
              style={styles.nutrientText}
            >{`${recipe.totalNutrients.FIBTG.quantity.toFixed(0)}${
              recipe.totalNutrients.FIBTG.unit
            } ${recipe.totalNutrients.FIBTG.label}`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NutrientDetails;

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 20,
    color: "#777",
  },
  overViewDetailsContainer: {
    gap: 5,
  },
  nutrientsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutrientsSubContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
  },
  icon: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
  },
  nutrientItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  nutrientText: {
    fontWeight: "500",
    fontSize: 16,
  },
});
