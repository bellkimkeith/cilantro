import { StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { useGroceries } from "@/src/providers/GroceriesContextProvider";
import { CheckBox } from "@rneui/themed";

import { useState } from "react";
import SearchBar from "@/src/components/SearchBar";

export default function Groceries() {
  const groceries = useGroceries().groceries;
  const toggleCheck = useGroceries().toggleCheck;
  const [searchText, setSearchText] = useState("");

  const updateSearch = (text: string) => {
    setSearchText(text);
  };

  const filteredGroceries = groceries.filter((item) =>
    item.food.includes(searchText)
  );

  return (
    <View style={styles.container}>
      <SearchBar
        handleSubmit={updateSearch}
        isMain={false}
        searchText={searchText}
        setSearchText={setSearchText}
      />
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
            {item.food}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkListItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#777",
    borderBottomWidth: 0.3,
  },
});
