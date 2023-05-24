/** @format */

import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { themeColors } from "../../theme";
import Domain from "../../../Domain";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { postUser } from "../../hooks/authHook";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const bgRegister = `${Domain.ipAddress}/api/images/auth/bgRegister.jpg`;

  const [visibilty, setVisibilty] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
  });

  const changeType = () => {
    setVisibilty(() => !visibilty);
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutate: addUser } = useMutation((formData) => postUser(formData), {
    onSuccess: (data) => {
      if (data.errors) {
        setLoading(false);
        setErrors({
          ...errors,
          username: data.errors.username,
          email: data.errors.email,
          password: data.errors.password,
        });
      } else {
        setLoading(false);
        console.log("sukses");
      }
    },
  });

  const handleSave = () => {
    // setLoading(true);
    // addUser(formData);
    ToastAndroid.show("Register user success", ToastAndroid.SHORT);
  };
  return loading ? (
    <View className="flex-1 justify-center items-center">
      <StatusBar
        barStyle="light-content"
        backgroundColor={themeColors.bgColor(1)}
        animated={true}
      />
      <ActivityIndicator size="large" color={themeColors.bgColor(1)} />
    </View>
  ) : (
    <SafeAreaView>
      <StatusBar style="light" />

      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{ uri: bgRegister }} />

          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="absolute top-14 bg-gray-50 p-2 rounded-full ml-3"
          >
            <Feather
              name="arrow-left-circle"
              size={25}
              color={themeColors.bgColor(1)}
            />
          </TouchableOpacity>
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
              <View
                className={`flex-row flex-1 rounded-xl p-2 bg-gray-100 ${
                  errors.username ? "border border-red-500" : "null"
                }`}
              >
                <Ionicons name="person-outline" size={24} color="gray" />
                <TextInput
                  className="ml-3 w-full"
                  placeholder="Enter username"
                  autoComplete="off"
                  value={formData.username}
                  onChangeText={(value) => handleChange("username", value)}
                />
              </View>
              {errors.username && (
                <Text className="text-red-500 text-sm mt-2">
                  {errors.username}
                </Text>
              )}
            </View>

            <View className="mb-3">
              <Text className="text-lg">Email</Text>
              <View
                className={`flex-row flex-1 rounded-xl p-2 bg-gray-100 ${
                  errors.email ? "border border-red-500" : "null"
                }`}
              >
                <AntDesign name="mail" size={24} color="gray" />
                <TextInput
                  className="ml-3 w-full"
                  placeholder="Enter email"
                  autoComplete="off"
                  value={formData.email}
                  onChangeText={(value) => handleChange("email", value)}
                />
              </View>
              {errors.email && (
                <Text className="text-red-500 text-sm mt-2">
                  {errors.email}
                </Text>
              )}
            </View>

            <View className="mb-3">
              <Text className="text-lg">Password</Text>
              <View
                className={`flex-row flex-1 rounded-xl p-2 bg-gray-100 ${
                  errors.password ? "border border-red-500" : "null"
                }`}
              >
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
              {errors.password && (
                <Text className="text-red-500 text-sm mt-2">
                  {errors.password}
                </Text>
              )}
            </View>

            <View className="my-3">
              <TouchableOpacity
                onPress={() => handleSave()}
                className="rounded-xl"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Text className="text-center p-3 text-white text-lg">
                  REGISTER
                </Text>
              </TouchableOpacity>
            </View>

            <View className="justify-center flex-row">
              <Text className=" font-semibold">Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  className="font-semibold"
                  style={{ color: themeColors.bgColor(1) }}
                >
                  {" "}
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
