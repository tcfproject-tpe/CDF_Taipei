/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-08 01:58:44
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 04:27:25
 * @FilePath: /sports_win/src/components/card/InfoCard.js
 */
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const InfoCardNormal = styled(Card)(() => {
  return {
    width: "100%",
    borderRadius: "16px",
    padding: "12px",
    boxShadow: "none",
    backgroundColor: "#EDF8FA",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };
});

const InfoCardNormalLarge = styled(Card)(() => {
  return {
    maxWidth: "100%",
    borderRadius: "16px",
    padding: "12px",
    boxShadow: "none",
    backgroundColor: "#F1F3F4",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };
});

const InfoCardMain = styled(Card)(() => {
  return {
    width: "100%",
    borderRadius: "16px",
    padding: "12px",
    boxShadow: "none",
    backgroundColor: "rgba(237, 248, 250, 1)",
    border: "1px solid rgba(90, 180, 197, 1)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    boxSizing: "border-box",
  };
});

const InfoCardSecondary = styled(Card)(() => {
  return {
    width: "100%",
    borderRadius: "16px",
    padding: "12px",
    boxShadow: "none",
    backgroundColor: "#FDF8ED",
    border: "1px solid #F5BA4B",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    boxSizing: "border-box",
  };
});

export { InfoCardMain, InfoCardNormal, InfoCardNormalLarge, InfoCardSecondary };
