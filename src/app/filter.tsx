import { StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";

const Filter = () => {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Option 1",
        value: "option1",
      },
      {
        id: "2",
        label: "Option 2",
        value: "option2",
      },
    ],
    []
  );

  return (
    <View style={styles.container}>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={(e) => {
          console.log(e);
          setSelectedId(e);
        }}
        selectedId={selectedId}
      />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
});
