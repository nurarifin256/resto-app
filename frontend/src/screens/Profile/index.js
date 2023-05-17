/** @format */

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { themeColors } from "../../theme";
import Domain from "../../../Domain";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Profile = () => {
  const bgRegister = `${Domain.ipAddress}/api/images/auth/bgRegister.jpg`;
  return (
    <SafeAreaView>
      <StatusBar style="light" />

      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{ uri: bgRegister }} />
        </View>

        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6 pb-36"
        >
          <View className="px-5 mb-3">
            <Text className="text-3xl font-bold mx-auto">Register</Text>
          </View>

          <View className="ml-32 mx-5">
            <View className="mb-3">
              <Text className="text-lg">Username</Text>
              <View className="flex-row flex-1 rounded-xl p-2 border border-gray-300">
                <Ionicons name="person-outline" size={24} color="gray" />
                <TextInput className="ml-3" placeholder="Enter username" />
              </View>
            </View>

            <View className="mb-3">
              <Text className="text-lg">Email</Text>
              <View className="flex-row flex-1 rounded-xl p-2 border border-gray-300">
                <AntDesign name="mail" size={24} color="gray" />
                <TextInput className="ml-3" placeholder="Enter email" />
              </View>
            </View>

            <View className="mb-3">
              <Text className="text-lg">Password</Text>
              <View className="flex-row flex-1 justify-between rounded-xl p-2 border border-gray-300">
                <View className="flex-row">
                  <AntDesign name="lock" size={24} color="gray" />
                  <TextInput
                    secureTextEntry={true}
                    className="ml-3 w-25"
                    placeholder="Enter password"
                  />
                </View>
                <View>
                  <Pressable>
                    <Ionicons name="eye-off-outline" size={24} color="gray" />
                  </Pressable>
                </View>
              </View>
            </View>

            <View className="mb-3">
              <View
                className="rounded-xl"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Text className="text-center p-3 text-white text-lg">
                  REGISTER
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
