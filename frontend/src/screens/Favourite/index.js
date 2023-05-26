/** @format */

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "../../theme";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

export default function Favourite() {
  // const imageInfo = ImagePicker.imageInfo;
  // const [selectedImage, setSelectedImage] = useState(imageInfo);
  // const openImagePickerAsync = async () => {
  //   let permissionResult =
  //     await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (permissionResult.granted === false) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }
  //   let pickerResult = await ImagePicker.launchImageLibraryAsync({
  //     quality: 1,
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //   });
  //   if (pickerResult.canceled === true) return;
  //   setSelectedImage(pickerResult);
  // };

  const [name, setName] = useState("");

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <View className="mx-5 mt-10">
          <View className="flex-row mb-3">
            <Feather
              name="arrow-left-circle"
              size={38}
              color={themeColors.bgColor(1)}
            />
            <View className="content-center w-full">
              <Text className="text-3xl ml-20 pt-1 font-bold">Category</Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="text-lg text-gray-700">Name</Text>
            <View className="bg-gray-200 rounded-xl p-2">
              <TextInput
                className="ml-3 w-full"
                placeholder="Enter name category"
                autoComplete="off"
                value={name}
              />
            </View>
            {/* {errors.username && (
                <Text className="text-red-500 text-sm mt-2">
                  {errors.username}
                </Text>
              )} */}
          </View>
          {/* {selectedImage ? (
            <View className="my-3">
              <Image
                className="w-32 h-32"
                source={{ uri: selectedImage.uri }}
              />
            </View>
          ) : (
            <Pressable
              className="rounded-xl"
              onPress={openImagePickerAsync}
              style={{ backgroundColor: themeColors.bgColor(1) }}
            >
              <Text className="text-center p-3 text-white text-lg">Upload</Text>
            </Pressable>
          )}
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
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
