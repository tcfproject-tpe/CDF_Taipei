/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-07 22:47:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-07 22:48:15
 * @FilePath: /sports_win/src/components/button/ColorButton.js
 */
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  backgroundColor: theme.palette.primary.main,
  borderRadius: "10px",
  width: "100%",
  marginTop: "16px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default ColorButton;
