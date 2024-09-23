/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-07 16:04:37
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-07 16:04:40
 * @FilePath: /sports_win/src/style/theme.js
 */
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#5AB4C5",
      light: "#EDF8FA",
      dark: "#468D9B",
    },
    secondary: {
      light: "#FDF8ED",
      main: "#F5BA4B",
      dark: "#E7A43C",
    },
    grey: {
      light: "#F1F3F4", //page-background-color
      main: "#E3E7E9", //btn-background-color
      dark: "#738995", //card-background-color
    },
    text: {
      primary: "#30383D",
      secondary: "#475259",
      third: "#91A0A8",
    },
    gradient: {
      main: "linear-gradient(315deg, rgba(68, 182, 199, 0.702) 0%, #44B6C7 100%)",
    },
    success: {
      main: "#76A732",
    },
    error: {
      main: "#D45251",
    },
    warning: {
      main: "#FD853A",
    },
    white: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"PingFang TC", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.25rem",
      lineHeight: "3rem",
      fontWeight: 500,
    },
    h1SemiBold: {
      fontSize: "2.25rem",
      lineHeight: "3rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      fontWeight: 500,
    },
    h2SemiBold: {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1rem",
      lineHeight: "1.375rem",
      fontWeight: 500,
    },
    h3SemiBold: {
      fontSize: "1rem",
      lineHeight: "1.375rem",
      fontWeight: 600,
    },
    body: {
      fontSize: "0.875rem",
      lineHeight: "1.375rem",
      fontWeight: 400,
    },
    bodySemiBold: {
      fontSize: "0.875rem",
      lineHeight: "1.375rem",
      fontWeight: 600,
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: "1.25rem",
      fontWeight: 500,
    },
    captionSemiBold: {
      fontSize: "0.75rem",
      lineHeight: "1.25rem",
      fontWeight: 600,
    },
  },
});
