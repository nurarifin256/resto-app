/** @format */

import React, { useCallback, useEffect } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { themeColors } from "../theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getData } from "../storage/userStorage";

export default function Search() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getData().then((data) => {
        console.log(data.token);
      });
    }, [])
  );

  return (
    <View className="flex-row items-center space-x-2 px-4">
      <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
        <AntDesign name="search1" size={25} color="gray" />
        <TextInput placeholder="Search..." className="ml-2 flex-1" />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{ backgroundColor: themeColors.bgColor(1) }}
        className="p-3 rounded-full"
      >
        <MaterialIcons name="login" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
}
