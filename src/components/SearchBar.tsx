import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

type SearchBarProps = {
  handleSubmit: (text: string) => void;
};

const SearchBar = ({ handleSubmit }: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          onSubmitEditing={(e) => {
            handleSubmit(e.nativeEvent.text);
          }}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setSearchText}
        />
        <FontAwesome6
          name="magnifying-glass"
          size={24}
          color="gray"
          onPress={() => {
            handleSubmit(searchText);
          }}
        />
      </View>
      <View>
        <FontAwesome6
          name="filter"
          size={24}
          color="gray"
          onPress={() => {
            console.log("show filter options");
          }}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 5,
  },
  search: {
    flex: 1,
    borderRadius: 20,
    padding: 12,
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});