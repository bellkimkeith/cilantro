import { Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { useGroceries } from "@/src/providers/GroceriesContextProvider";
import { CheckBox } from "@rneui/themed";

import { useState } from "react";
import SearchBar from "@/src/components/SearchBar";
import { Stack } from "expo-router";

export default function Groceries() {
  const groceries = useGroceries().groceries;
  const toggleCheck = useGroceries().toggleCheck;
  const resetGroceries = useGroceries().resetGroceries;
  const [searchText, setSearchText] = useState("");

  const updateSearch = (text: string) => {
    setSearchText(text);
  };

  const filteredGroceries = groceries.filter((item) =>
    item.food.includes(searchText)
  );

  if (groceries.length <= 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No groceries added yet</Text>
      </View>
    );
  }

  if (filteredGroceries.length <= 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>{`No results for ${searchText}`}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => {
                resetGroceries();
              }}
              style={{ paddingRight: 10 }}
            >
              {({ pressed }) => (
                <Text
                  style={{
                    opacity: pressed ? 0.5 : 1,
                  }}
                >
                  Clear
                </Text>
              )}
            </Pressable>
          ),
        }}
      />
      <SearchBar
        handleSubmit={updateSearch}
        isMain={false}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredGroceries.map((item, index) => (
          <View key={index} style={styles.checkListItem}>
            <CheckBox
              checked={item.checked}
              uncheckedIcon={"circle-o"}
              checkedIcon={"check-circle-o"}
              checkedColor="green"
              onPress={() => toggleCheck(item.foodId)}
              size={28}
            />
            <Text
              style={[
                styles.title,
                { textDecorationLine: item.checked ? "line-through" : "none" },
              ]}
            >
              {`${item.weight.toFixed(2)}g  ${item.food}`}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  checkListItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#777",
    borderBottomWidth: 0.3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
