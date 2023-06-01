/** @format */

import Domain from "../../Domain";
import { getData } from "../storage/userStorage";

const token = getData();

export const postCategory = async (formData) => {
  const created_by = token._j.user.name;
  formData._parts.push(["created_by", created_by]);

  let response = await fetch(`${Domain.ipAddress}/api/category`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token._j.token}`,
    },
  });
  response = await response.json();
  return response;
};
