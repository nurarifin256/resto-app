/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const dataJson = await AsyncStorage.getItem("storage_user");
    const dataObject = JSON.parse(dataJson);
    if (dataObject !== null) {
      // console.log(dataObject.token);
      return dataObject;
    }
  } catch (e) {
    console.log(e);
  }
};
