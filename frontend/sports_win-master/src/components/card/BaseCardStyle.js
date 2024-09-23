/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-05 06:59:17
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-07 17:52:30
 * @FilePath: /sports_win/src/components/card/BaseCardStyle.js
 */
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

const BaseCard = styled(Card)(() => {
  return {
    maxWidth: "100%",
    width: "100%",
    borderRadius: "16px",
    marginTop: "16px",
    padding: "16px 0px",
    boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.04)",
  };
});

export default BaseCard;
