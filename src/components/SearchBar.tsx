import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Badge } from "@rneui/base";
import { useParams } from "../providers/SearchFilterContextProvider";
import Colors from "../constants/Colors";

type SearchBarProps = {
  handleSubmit: (text: string) => void;
  isMain: boolean;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
};

const SearchBar = ({
  handleSubmit,
  setSearchText,
  searchText,
}: SearchBarProps) => {
  const { filtersCount, parameters } = useParams();

  return (
    <View style={styles.container}>
      <FontAwesome6
        name="magnifying-glass"
        size={24}
        color={Colors.light.tint}
        onPress={() => {
          handleSubmit(searchText);
        }}
        suppressHighlighting={true}
      />
      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          onSubmitEditing={(e) => {
            handleSubmit(e.nativeEvent.text);
          }}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setSearchText}
          clearButtonMode="always"
        />
      </View>
      <View>
        <Link href="/filter" asChild>
          <Pressable>
            <FontAwesome6
              name="filter"
              size={24}
              color={Colors.light.tint}
              suppressHighlighting={true}
            />
            <Badge
              value={
                parameters.searchText !== "" ? filtersCount - 1 : filtersCount
              }
              status="error"
              containerStyle={{
                position: "absolute",
                top: -5,
                right: -5,
                display:
                  (filtersCount > 0 && parameters.searchText === "") ||
                  (filtersCount > 1 && parameters.searchText !== "")
                    ? "flex"
                    : "none",
              }}
            />
          </Pressable>
        </Link>
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
    backgroundColor: "#E0FBE2",
    borderRadius: 20,
    padding: 12,
    borderWidth: 0.2,
  },
  search: {
    flex: 1,
  },
});
