/** @format */

import Domain from "../../Domain";

const getCsrf = async () => {
  let response = await fetch(`${Domain.ipAddress}/sanctum/csrf-cookie`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  response = await response.json();
  return response;
};
