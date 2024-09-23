/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-05 07:59:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-07 22:23:30
 * @FilePath: /sports_win/src/components/utility/ChipsStyle.js
 */
import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../../style/theme";

const BaseChips = styled(Chip)(() => {
  return {
    minWidth: "78px",
    padding: "2px 0px",
    height: "25px",
    backgroundColor: theme.palette.grey.main,
    fontSize: theme.typography.captionSemiBold.fontSize,
    borderRadius: "6px",
  };
});

const AvatarChips = styled(Chip)(({ theme, active }) => ({
  minWidth: "78px",
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.primary.light,
  fontSize: theme.typography.body.fontSize,
  color: active ? theme.palette.white.main : theme.palette.primary.main,
  borderRadius: "100px",
  border: `1px solid ${theme.palette.primary.main}`,
  "& .MuiChip-avatar": {
    color: theme.palette.white.main,
    backgroundColor: active
      ? theme.palette.primary.dark
      : theme.palette.primary.main,
  },
  "& .MuiChip-label": {
    color: active ? theme.palette.white.main : theme.palette.primary.main,
  },
}));

export { AvatarChips, BaseChips };
