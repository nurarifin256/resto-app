/** @format */

import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Search from "../../components/Search";

const Home = () => {
  return (
    <SafeAreaView className="bg-gray-100 my-10">
      <StatusBar barStyle="dark-content" />

      {/* search */}
      <Search />
      {/* end search */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
