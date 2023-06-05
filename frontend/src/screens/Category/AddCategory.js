/** @format */

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  LogBox,
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "../../theme";
import { Feather } from "@expo/vector-icons";
import { postCategory } from "../../hooks/categoryHook";
import { useToast } from "react-native-toast-notifications";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function AddCategory({ route }) {
  const toast = useToast();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [errName, setErrName] = useState("");
  const [imageSource, setImageSource] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImageSource(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (imageSource == null) {
      toast.show("Image is required", {
        type: "warning",
        placement: "top",
        duration: 4000,
        offsetTop: 50,
        animationType: "zoom-in",
      });
    } else {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", {
        uri: imageSource,
        type: "image/jpeg",
        name: "image.jpg",
      });

      try {
        const response = await postCategory(formData);
        if (response.message == "Successfull add category") {
          setLoading(false);
          navigation.navigate("Category");
          toast.show("Add category success", {
            type: "success",
            placement: "top",
            duration: 4000,
            offsetTop: 50,
            animationType: "zoom-in",
          });
          route.params.refetch();
        } else {
          setLoading(false);
          setErrName(response.name);
        }
      } catch (error) {
        setLoading(false);
        console.log("Error bos: ", error);
      }
    }
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
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View className="mx-5 mt-10">
          <View className="flex-row mb-3">
            <TouchableOpacity onPress={() => navigation.navigate("Category")}>
              <Feather
                name="arrow-left-circle"
                size={38}
                color={themeColors.bgColor(1)}
              />
            </TouchableOpacity>
            <View className="content-center w-full">
              <Text className="text-3xl ml-20 pt-1 font-bold">Category</Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="text-lg text-gray-700">Name</Text>
            <View
              className={`bg-white rounded-xl p-2 ${
                errName ? "border border-red-500" : "null"
              }`}
            >
              <TextInput
                className="ml-3 w-full"
                placeholder="Enter name category"
                autoComplete="off"
                value={name}
                onChangeText={(value) => setName(value)}
              />
            </View>
            {errName && (
              <Text className="text-red-500 text-sm mt-1">{errName}</Text>
            )}
          </View>

          <View className="mb-3">
            {imageSource ? (
              <>
                <Image
                  source={{ uri: imageSource }}
                  style={{ width: 100, height: 100 }}
                  className="mb-3 rounded-xl"
                />

                <Pressable
                  onPress={() => setImageSource(null)}
                  className="rounded-xl bg-blue-500"
                >
                  <Text className="text-white text-lg text-center p-3">
                    Remove Image
                  </Text>
                </Pressable>
              </>
            ) : (
              <Pressable
                onPress={selectImage}
                className="rounded-xl bg-blue-500"
              >
                <Text className="text-white text-lg text-center p-3">
                  Choose Image
                </Text>
              </Pressable>
            )}
          </View>

          <View>
            <Pressable
              onPress={() => handleSave()}
              className="rounded-xl"
              style={{ backgroundColor: themeColors.bgColor(1) }}
            >
              <Text className="text-center p-3 text-white text-lg">SAVE</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
