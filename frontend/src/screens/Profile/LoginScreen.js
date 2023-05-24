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
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Domain from "../../../Domain";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../hooks/authHook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

export default function LoginScreen() {
  const bgRegister = `${Domain.ipAddress}/api/images/auth/bgRegister.jpg`;
  const navigation = useNavigation();
  const toast = useToast();

  const [visibilty, setVisibilty] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const changeType = () => {
    setVisibilty(() => !visibilty);
  };
  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutate: login } = useMutation((formData) => loginUser(formData), {
    onSuccess: (data) => {
      if (data.message == "Bad credintial") {
        setLoading(false);
        setErrors({
          ...errors,
          email: "Wrong email",
          password: "Wrong password",
        });
      } else if (data.errors) {
        setLoading(false);
        setErrors({
          ...errors,
          email: data.errors.email,
          password: data.errors.password,
        });
      } else {
        const jsonValue = JSON.stringify(data.data);
        AsyncStorage.setItem("storage_user", jsonValue);
        setLoading(false);
        navigation.navigate("Home");
        toast.show("Login user success", {
          type: "success",
          placement: "top",
          duration: 4000,
          offsetTop: 50,
          animationType: "zoom-in",
        });
      }
    },
  });

  // const query = useQuery({ queryKey: ["csrf"], queryFn: getCsrf });
  // console.log(query);

  const handleLogin = () => {
    setLoading(true);
    login(formData);
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
          className="bg-white -mt-12 pt-6 pb-64"
        >
          <View className="px-5 mb-3">
            <Text className="text-3xl font-bold mx-auto">Login</Text>
          </View>

          <View className="ml-32 mx-5">
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

            <View className="mb-3">
              <TouchableOpacity
                onPress={() => handleLogin()}
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
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
