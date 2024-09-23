/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-08 05:13:14
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 05:14:57
 * @FilePath: /sports_win/src/api/postBooking.js
 */
import { service2 } from "./axios";

export const postBooking = async (bookingData) => {
  return await service2.post("/book_court", bookingData);
};
