import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Hits } from "../utils/Types";

const Ingredients = ({ recipe }: Hits) => {
  const [yieldCount, setYieldCount] = useState(recipe.yield);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Ingredients</Text>
        <View style={styles.yieldCounterContainer}>
          <Text style={styles.subText}>Yield</Text>
          <View style={styles.yieldCounterDetails}>
            <Text
              style={styles.buttons}
              onPress={() => {
                if (yieldCount > 1) setYieldCount(yieldCount - 1);
              }}
              suppressHighlighting={true}
            >
              -
            </Text>
            <Text style={styles.subText}> {yieldCount} </Text>
            <Text
              style={styles.buttons}
              onPress={() => {
                if (yieldCount < 1000) setYieldCount(yieldCount + 1);
              }}
              suppressHighlighting={true}
            >
              +
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        {recipe.ingredients.map((item) => (
          <View style={styles.ingredientItemContainer} key={item.foodId}>
            <Text style={styles.ingredientText}>
              {(item.weight * (yieldCount / recipe.yield)).toFixed(2)}g
            </Text>
            <Text style={styles.ingredientText}>{item.food}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Ingredients;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#eee",
    gap: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  yieldCounterContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  yieldCounterDetails: {
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderColor: "#777",
    alignItems: "center",
  },
  subText: {
    fontSize: 18,
  },
  buttons: {
    fontSize: 24,
  },
  ingredientItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ingredientText: {
    fontSize: 18,
    textAlign: "left",
  },
  ingredientsContainer: {
    gap: 4,
  },
});
