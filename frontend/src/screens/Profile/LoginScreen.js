/** @format */

import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Domain from "../../../Domain";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const bgRegister = `${Domain.ipAddress}/api/images/auth/bgRegister.jpg`;
  const navigation = useNavigation();

  const [visibilty, setVisibilty] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeType = () => {
    setVisibilty(() => !visibilty);
  };
  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
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
            <Text className="text-3xl font-bold mx-auto">Login</Text>
          </View>

          <View className="ml-32 mx-5">
            <View className="mb-3">
              <Text className="text-lg">Email</Text>
              <View className="flex-row flex-1 rounded-xl p-2 bg-gray-100">
                <AntDesign name="mail" size={24} color="gray" />
                <TextInput
                  className="ml-3 w-full"
                  placeholder="Enter email"
                  autoComplete="off"
                  value={formData.email}
                  onChangeText={(value) => handleChange("email", value)}
                />
              </View>
            </View>

            <View className="mb-3">
              <Text className="text-lg">Password</Text>
              <View className="flex-row flex-1 justify-between rounded-xl p-2 bg-gray-100">
                <View className="flex-row">
                  <AntDesign name="lock" size={24} color="gray" />
                  <TextInput
                    secureTextEntry={visibilty}
                    className="ml-3"
                    placeholder="Enter password"
                    style={{ width: 250 }}
                    value={formData.password}
                    onChangeText={(value) => handleChange("password", value)}
                  />
                </View>
                <View>
                  <Pressable onPress={() => changeType()}>
                    {visibilty ? (
                      <Ionicons name="eye-off-outline" size={24} color="gray" />
                    ) : (
                      <Ionicons name="eye-outline" size={24} color="gray" />
                    )}
                  </Pressable>
                </View>
              </View>
            </View>

            <View className="mb-3">
              <TouchableOpacity
                onPress={() => handleSave()}
                className="rounded-xl"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Text className="text-center p-3 text-white text-lg">
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>

            <View className="justify-center flex-row">
              <Text className=" font-semibold">Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Text
                  className="font-semibold"
                  style={{ color: themeColors.bgColor(1) }}
                >
                  {" "}
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}