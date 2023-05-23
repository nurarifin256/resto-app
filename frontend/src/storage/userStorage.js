/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const dataJson = await AsyncStorage.getItem("storage_user");
    return (dataObject = JSON.parse(dataJson));
  } catch (e) {
    console.log(e);
  }
};
