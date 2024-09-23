/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-08 03:37:10
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 03:45:12
 * @FilePath: /sports_win/src/components/venueInfo/BasicInfo.js
 */
import { Box, Link, Typography } from "@mui/material";

const BasicInfo = ({ venueInfo }) => {
  return (
    <div>
      <Box my={2}>
        <Typography
          variant="h2SemiBold"
          sx={{
            color: "text.primary",
          }}
        >
          {venueInfo.name}
        </Typography>
      </Box>
      <Link
        component="a"
        variant="body"
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${venueInfo.address}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: "text.secondary",
          marginLeft: "8px",
          textDecoration: "underline",
          display: "flex",
          alignItems: "center",
          marginBottom: "8px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/icons/icon_location.svg"
          alt="位置"
          style={{ marginRight: "8px" }}
        />
        {venueInfo.address}
      </Link>
      <Link
        component="a"
        variant="body"
        href={`tel:${encodeURIComponent("(02)28819471#5606")}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: "text.secondary",
          marginLeft: "8px",
          textDecoration: "underline",
          display: "flex",
          alignItems: "center",
          marginBottom: "8px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/icons/icon_phone.svg"
          alt="電話"
          style={{ marginRight: "8px" }}
        />
        {venueInfo.manager_phone}
      </Link>
      <Link
        component="a"
        variant="body"
        href={"http://www.scu.edu.tw/physical/"}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: "text.secondary",
          marginLeft: "8px",
          textDecoration: "underline",
          display: "flex",
          alignItems: "center",
          marginBottom: "12px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="/icons/icon_web.svg"
          alt="官網"
          style={{ marginRight: "8px" }}
        />
        {venueInfo.official_website}
      </Link>
    </div>
  );
};

export default BasicInfo;
