/** @format */

import React from "react";
import { TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Search() {
  return (
    <View className="flex-row items-center space-x-2 px-4">
      <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
        <AntDesign name="search1" size={25} color="gray" />
        <TextInput placeholder="Search..." className="ml-2 flex-1" />
      </View>
    </View>
  );
}
