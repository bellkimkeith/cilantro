import { StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { useGroceries } from "@/src/providers/GroceriesContextProvider";

export default function Groceries() {
  const groceries = useGroceries().groceries;

  return (
    <View style={styles.container}>
      {groceries.map((item) => (
        <Text style={styles.title}>{item.food}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
