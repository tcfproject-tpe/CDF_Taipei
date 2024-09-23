/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-07 22:51:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 07:37:36
 * @FilePath: /sports_win/src/page/VenueDetail.js
 */
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { getVenueInfo } from "../api/getVenueInfo";
import {
  InfoCardNormal,
  InfoCardNormalLarge,
} from "../components/card/InfoCard";
import ToggleCard from "../components/card/ToggleCard";
import { Wrapper } from "../components/utility/LayoutStyle";
import BasicInfo from "../components/venueInfo/BasicInfo";
import { theme } from "../style/theme";

const ColoredCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const VenueDetail = () => {
  const { sport, id } = useParams();
  const navigate = useNavigate();

  const [venueInfo, setVenueInfo] = useState(null);

  useEffect(() => {
    const fetchVenueInfo = async () => {
      try {
        const { data } = await getVenueInfo(id);
        const {
          name,
          address,
          availability_status,
          official_website,
          manager_phone,
          opening_days,
          pay_use,
          venue_description,
          affiliated_property,
          opening_closure_notice,
          parking_type,
          affiliated_agency,
        } = data;
        setVenueInfo({
          name,
          address,
          availability_status,
          official_website,
          manager_phone,
          opening_days,
          pay_use,
          venue_description,
          affiliated_property,
          opening_closure_notice,
          parking_type,
          affiliated_agency,
        });
      } catch (error) {
        console.error("fetchVenueInfo failed:", error);
      }
    };
    fetchVenueInfo();
  }, [id]);

  if (!venueInfo) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ColoredCircularProgress />
      </Box>
    );
  }

  const {
    availability_status,
    opening_days,
    venue_description,
    affiliated_property,
    opening_closure_notice,
    parking_type,
    affiliated_agency,
  } = venueInfo;

  return (
    <ThemeProvider theme={theme}>
      <Wrapper sx={{ backgroundColor: "#fff" }}>
        <BasicInfo venueInfo={venueInfo} />
        <Divider />
        <Box
          py={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
          }}
        >
          <InfoCardNormal>
            <Typography
              variant="h3SemiBold"
              sx={{
                color: "primary.main",
              }}
            >
              開放情形
            </Typography>
            <Typography
              variant="body"
              sx={{
                color: "text.second",
                paddingLeft: "8px",
              }}
            >
              {availability_status}
            </Typography>
          </InfoCardNormal>
          <InfoCardNormal>
            <Typography
              variant="h3SemiBold"
              sx={{
                color: "primary.main",
              }}
            >
              開放時間
            </Typography>
            <Typography
              variant="body"
              sx={{
                color: "text.second",
                paddingLeft: "8px",
              }}
            >
              {opening_days}
            </Typography>
          </InfoCardNormal>
        </Box>
        <Divider />
        <Box
          py={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <InfoCardNormalLarge>
            <Typography
              variant="h3SemiBold"
              sx={{
                color: "text.primary",
              }}
            >
              開放情形
            </Typography>
            <Typography
              variant="body"
              sx={{
                color: "text.secondary",
                paddingLeft: "8px",
              }}
            >
              {opening_closure_notice}
            </Typography>
          </InfoCardNormalLarge>
          <InfoCardNormalLarge>
            <Typography
              variant="h3SemiBold"
              sx={{
                color: "text.primary",
              }}
            >
              停車場種類
            </Typography>
            <Typography
              variant="body"
              sx={{
                color: "text.secondary",
                paddingLeft: "8px",
              }}
            >
              {parking_type}
            </Typography>
          </InfoCardNormalLarge>
        </Box>
        <ToggleCard
          title="運動場館介紹"
          subtitle={affiliated_agency}
          content={venue_description}
          subcontent={affiliated_property}
        />
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 2,
            backgroundColor: "background.paper",
            boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{
              color: "white !important",
              borderRadius: "8px",
              padding: "12px",
              boxShadow: "none",
            }}
            onClick={() => {
              navigate(`/${sport}/${id}/submit`);
            }}
          >
            預定場地
          </Button>
        </Box>
      </Wrapper>
    </ThemeProvider>
  );
};

export default VenueDetail;
