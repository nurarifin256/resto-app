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

export const getCategories = async () => {
  let response = await fetch(`${Domain.ipAddress}/api/category`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token._j.token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  response = await response.json();
  return response;
};
