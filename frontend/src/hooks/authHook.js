/** @format */

import Domain from "../../Domain";

export const postUser = async (formData) => {
  let response = await fetch(`${Domain.ipAddress}/api/post-user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  response = await response.json();
  return response;
};

export const loginUser = async (formData) => {
  let response = await fetch(`${Domain.ipAddress}/api/login-user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  response = await response.json();
  return response;
};

export const logoutUser = async (token) => {
  let response = await fetch(`${Domain.ipAddress}/api/logout-user`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  response = await response.json();
  return response;
};
