/** @format */

import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Search from "../../components/Search";
import Categories from "../../components/Categories";

const Home = () => {
  return (
    <SafeAreaView className="bg-gray-100 my-10">
      <StatusBar barStyle="dark-content" />

      {/* search */}
      <Search />
      {/* end search */}

      {/* categories */}
      <Categories />
      {/* end categories */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
