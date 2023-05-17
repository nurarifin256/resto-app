/** @format */

import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  return (
    <SafeAreaView className="bg-gray-100 my-10">
      <StatusBar barStyle="dark-content" />
      {/* search */}
      <View className="flex-row items-center space-x-2 px-4">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <AntDesign name="search1" size={25} color="gray" />
          <TextInput placeholder="Search..." className="ml-2 flex-1" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
