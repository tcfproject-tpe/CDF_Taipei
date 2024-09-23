/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-08 00:37:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 05:12:40
 * @FilePath: /sports_win/src/api/axios.js
 */
import axios from "axios";

const createAxiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
    timeout: 50000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": true,
    },
  });
};

const service1 = createAxiosInstance(
  "https://8172-211-23-28-230.ngrok-free.app/api/"
);
const service2 = createAxiosInstance(
  "https://6d2c-211-23-28-230.ngrok-free.app/"
);

export { service1, service2 };
