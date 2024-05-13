import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Hits } from "../utils/Types";
import { useGroceries } from "../providers/GroceriesContextProvider";

const Ingredients = ({ recipe }: Hits) => {
  const [yieldCount, setYieldCount] = useState(recipe.yield);
  const { addItem } = useGroceries();

  const addIngredients = () => {
    addItem(recipe, yieldCount / recipe.yield);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Ingredients</Text>
        <View style={styles.yieldCounterContainer}>
          <Text style={styles.subText}>Servings</Text>
          <View style={styles.yieldCounterDetails}>
            <Text
              style={styles.buttons}
              onPress={() => {
                setYieldCount(yieldCount - 1);
              }}
              suppressHighlighting={true}
              disabled={yieldCount === 1}
            >
              -
            </Text>
            <Text style={styles.subText}> {yieldCount} </Text>
            <Text
              style={styles.buttons}
              onPress={() => {
                setYieldCount(yieldCount + 1);
              }}
              suppressHighlighting={true}
              disabled={yieldCount === 999}
            >
              +
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.ingredientsContainer}>
        {recipe.ingredients.map((item, index) => (
          <View style={styles.ingredientItemContainer} key={index}>
            <Text style={styles.ingredientText}>
              {(item.weight * (yieldCount / recipe.yield)).toFixed(2)}g
            </Text>
            <Text style={styles.ingredientText}>{item.food}</Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.addButton} onPress={addIngredients}>
        {({ pressed }) => (
          <Text style={[styles.addButtonText, { opacity: pressed ? 0.5 : 1 }]}>
            Add to groceries
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default Ingredients;

const styles = StyleSheet.create({
  container: {
    padding: 24,
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
    borderColor: "#555",
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
    borderBottomColor: "#555",
    borderBottomWidth: 0.3,
    paddingBottom: 2,
  },
  ingredientText: {
    fontSize: 18,
    textAlign: "left",
    flex: 1,
  },
  ingredientsContainer: {
    gap: 4,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#75A47F",
    marginVertical: 10,
    paddingVertical: 14,
    marginHorizontal: 20,
    borderRadius: 40,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
