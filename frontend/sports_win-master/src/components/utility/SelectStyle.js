/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-08 01:30:04
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 01:30:54
 * @FilePath: /sports_win/src/components/utility/SelectStyle.js
 */
import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BaseSelect = styled(Select)(() => {
  return {
    borderRadius: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "10px",
    },
  };
});
