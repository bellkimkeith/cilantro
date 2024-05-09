import { StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import SearchBar from "@/src/components/SearchBar";

export default function Home() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.container}>
        <Text>Add Recipe Card Preview</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchResults: {
    flex: 1,
  },
});
