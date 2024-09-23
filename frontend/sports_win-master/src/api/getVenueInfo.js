/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-08 02:27:21
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 05:12:18
 * @FilePath: /sports_win/src/api/getVenueInfo.js
 */
import { service1 } from "./axios";

export const getVenueInfo = async (id) => {
  return await service1({
    url: `/court_one`,
    method: "get",
    params: { id },
  });
};
