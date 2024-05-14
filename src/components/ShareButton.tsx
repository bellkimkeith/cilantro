import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Alert, Share, View, Text } from "react-native";

type ShareButtonProps = {
  message: string;
};

const ShareButton = ({ message }: ShareButtonProps) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <View>
      <Text onPress={onShare} suppressHighlighting={true}>
        <FontAwesome6 name="share-nodes" size={24} color="#1A4D2E" />
      </Text>
    </View>
  );
};

export default ShareButton;
