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
  Button,
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "../../theme";
import { Feather } from "@expo/vector-icons";
import { postCategory } from "../../hooks/categoryHook";
import * as ImagePicker from "expo-image-picker";

export default function Favourite() {
  const [name, setName] = useState("");
  const [imageSource, setImageSource] = useState(null);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setImageSource(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", {
      uri: imageSource,
      type: "image/jpeg",
      name: "image.jpg",
    });

    try {
      const response = await postCategory(formData);

      console.log(response);
      // if (response.ok) {
      //   console.log("Data saved successfully");
      // } else {
      //   console.log("Failed to save data");
      // }
    } catch (error) {
      console.log("Error bos: ", error);
    }
  };

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
                onChangeText={(value) => setName(value)}
              />
            </View>
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
              <Button title="Choose Photo" onPress={selectImage} />
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

{
  /* <Pressable
                onPress={selectImage}
                className="rounded-xl bg-blue-500"
              >
                <Text className="text-white text-lg text-center p-3">
                  Choose Image
                </Text>
              </Pressable> */
}
