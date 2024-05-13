import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Hits } from "../utils/Types";
import { useFavorites } from "../providers/FavoritesContextProvider";
import ShareButton from "./ShareButton";

const NutrientDetails = ({ recipe, _links }: Hits) => {
  const { favorites, addItem, removeItem } = useFavorites();
  const isFavorite = favorites.find(
    (item) => item.recipe.label === recipe.label
  );
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.overViewDetailsContainer}>
        <View style={styles.overViewTextContainer}>
          <Text style={styles.headerText}>{recipe.label}</Text>
          <Text style={styles.subText}>{recipe.source}</Text>
        </View>
        <View style={styles.headerButtonsContainer}>
          <FontAwesome
            name={isFavorite ? "star" : "star-o"}
            size={28}
            color="#1A4D2E"
            onPress={() => {
              if (isFavorite) {
                removeItem(recipe.label);
              } else {
                addItem({ recipe, _links });
              }
            }}
            suppressHighlighting={true}
          />
          <ShareButton message={recipe.shareAs} />
        </View>
      </View>
      <View style={styles.nutrientsContainer}>
        <View style={styles.nutrientsSubContainer}>
          <View style={styles.nutrientItemContainer}>
            <View style={styles.icon}>
              <FontAwesome5 name="fire-alt" size={28} color="#E72929" />
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
                color="#FF6666"
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
              <FontAwesome6 name="pizza-slice" size={28} color="#DEA057" />
            </View>
            <Text
              style={styles.nutrientText}
            >{`${recipe.totalNutrients.FAT.quantity.toFixed(0)}${
              recipe.totalNutrients.FAT.unit
            } ${recipe.totalNutrients.FAT.label}`}</Text>
          </View>
          <View style={styles.nutrientItemContainer}>
            <View style={styles.icon}>
              <FontAwesome6 name="wheat-awn" size={28} color="#B99470" />
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
    color: "#555",
  },
  overViewDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  overViewTextContainer: {
    flex: 1,
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
    backgroundColor: "#ACE1AF",
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
  headerButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
