/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-07 16:39:33
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-07 16:49:33
 * @FilePath: /sports_win/src/components/utility/LayoutStyle.js
 */
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../style/theme";

export const Wrapper = styled(Box)(() => {
  return {
    padding: "1px 16px 16px",
    backgroundColor: theme.palette.grey.light,
    minHeight: "100vh",
  };
});
