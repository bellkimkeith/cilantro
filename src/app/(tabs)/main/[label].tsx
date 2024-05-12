import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCachedRecipes } from "@/src/api/recipes";
import { CachedRecipes } from "@/src/utils/Types";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// "totalNutrients": {
//   "ENERC_KCAL": {
//     "label": "Energy",
//     "quantity": 4744.685052368801,
//     "unit": "kcal"
//   },

const Details = () => {
  const { label } = useLocalSearchParams();
  const recipes: CachedRecipes | undefined = useCachedRecipes();
  const currentRecipe =
    recipes &&
    recipes.hits.find(
      (item) => item.recipe.label.replace(/[^a-zA-Z]+/g, " ").trim() === label
    );

  if (!currentRecipe) {
    return (
      <View>
        <Text>No details for this recipe</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: typeof label === "string" ? label : "",
          headerBackTitleVisible: false,
        }}
      />
      <Image
        source={{
          uri: currentRecipe && currentRecipe.recipe.image,
        }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.overViewDetailsContainer}>
          <Text style={styles.headerText}>{label}</Text>
          <Text style={styles.subText}>
            {currentRecipe && currentRecipe.recipe.source}
          </Text>
        </View>
        <View style={styles.nutrientsContainer}>
          <View style={styles.nutrientsSubContainer}>
            <View style={styles.nutrientItemContainer}>
              <View style={styles.icon}>
                <FontAwesome5 name="fire-alt" size={28} color="#777" />
              </View>
              <Text
                style={styles.nutrientText}
              >{`${currentRecipe.recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(
                0
              )} ${currentRecipe.recipe.totalNutrients.ENERC_KCAL.unit}`}</Text>
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
              >{`${currentRecipe.recipe.totalNutrients.PROCNT.quantity.toFixed(
                0
              )}${currentRecipe.recipe.totalNutrients.PROCNT.unit} ${
                currentRecipe.recipe.totalNutrients.PROCNT.label
              }`}</Text>
            </View>
          </View>
          <View style={styles.nutrientsSubContainer}>
            <View style={styles.nutrientItemContainer}>
              <View style={styles.icon}>
                <FontAwesome6 name="pizza-slice" size={28} color="#777" />
              </View>
              <Text
                style={styles.nutrientText}
              >{`${currentRecipe.recipe.totalNutrients.FAT.quantity.toFixed(
                0
              )}${currentRecipe.recipe.totalNutrients.FAT.unit} ${
                currentRecipe.recipe.totalNutrients.FAT.label
              }`}</Text>
            </View>
            <View style={styles.nutrientItemContainer}>
              <View style={styles.icon}>
                <FontAwesome6 name="wheat-awn" size={28} color="#777" />
              </View>
              <Text
                style={styles.nutrientText}
              >{`${currentRecipe.recipe.totalNutrients.FIBTG.quantity.toFixed(
                0
              )}${currentRecipe.recipe.totalNutrients.FIBTG.unit} ${
                currentRecipe.recipe.totalNutrients.FIBTG.label
              }`}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    height: 250,
  },
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
