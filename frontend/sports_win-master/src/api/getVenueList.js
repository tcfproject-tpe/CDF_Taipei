/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-08 01:58:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 05:57:41
 * @FilePath: /sports_win/src/api/getVenueList.js
 */
import { service2 } from "./axios";

export const getVenueList = async (params) => {
  return await service2.get("/courts_status", { params });
};
