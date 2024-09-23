/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-08 01:43:21
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 07:52:15
 * @FilePath: /sports_win/src/page/VenueSubmit.js
 */
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getVenueInfo } from "../api/getVenueInfo";
import { Wrapper } from "../components/utility/LayoutStyle";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  CircularProgress,
  Divider,
  Snackbar,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { postBooking } from "../api/postBooking";
import {
  InfoCardMain,
  InfoCardNormalLarge,
  InfoCardSecondary,
} from "../components/card/InfoCard";
import BasicInfo from "../components/venueInfo/BasicInfo";
import { images } from "../data/data";
import { theme } from "../style/theme";

const ColoredCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.light,
}));

const VenueSubmit = () => {
  const bookNumber = 0;
  const { sport, id } = useParams();
  const navigate = useNavigate();
  const [venueInfo, setVenueInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    if (touchEnd - touchStart > 75) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  useEffect(() => {
    const fetchVenueInfo = async () => {
      try {
        const { data } = await getVenueInfo(id);
        const { name, address, manager_phone, price } = data;
        setVenueInfo({
          name,
          address,
          manager_phone,
          price,
        });
      } catch (error) {
        console.error("fetchVenueInfo failed:", error);
      }
    };
    fetchVenueInfo();
  }, [id]);

  const handleBooking = async () => {
    const bookingData = {
      userId: "1",
      courtId: 16,
      date: "2024/09/09",
      period: "09:00-10:00",
    };
    setIsLoading(true);

    try {
      const response = await postBooking(bookingData);
      console.log("success:", response.data);
      setIsLoading(true);
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
        navigate(`/${sport}`);
      }, 2000); // 2秒后跳转
    } catch (error) {
      console.error("fetchVenueInfo failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <ThemeProvider theme={theme}>
      <Wrapper sx={{ backgroundColor: "#fff" }}>
        <BasicInfo venueInfo={venueInfo} />
        <Divider />
        <Box py={2}>
          <InfoCardNormalLarge>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/icons/icon_info.svg"
                alt="配置"
                style={{ marginRight: "8px" }}
              />
              <Typography
                variant="body"
                sx={{
                  color: "text.third",
                  whiteSpace: "nowrap",
                }}
              >
                請選擇您的身份來預約運動場
              </Typography>
            </Box>
          </InfoCardNormalLarge>
          <CardMedia
            sx={{
              width: "100%",
              paddingTop: "16px",
            }}
            component="img"
            image={images[currentImageIndex]}
            alt="card"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
          }}
        >
          <InfoCardMain>
            <Typography
              variant="h3SemiBold"
              sx={{
                color: "primary.main",
              }}
            >
              預約日期
            </Typography>
            <Typography
              variant="body"
              sx={{
                color: "text.second",
              }}
            >
              2024/09/09
            </Typography>
          </InfoCardMain>
          <InfoCardMain>
            <Typography
              variant="h3SemiBold"
              sx={{
                color: "primary.main",
              }}
            >
              預約時段
            </Typography>
            <Typography
              variant="body"
              sx={{
                color: "text.second",
              }}
            >
              09:00-10:00
            </Typography>
          </InfoCardMain>
        </Box>
        {bookNumber <= 1 ? (
          <InfoCardMain sx={{ margin: "16px 0px" }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h3SemiBold"
                sx={{
                  color: "primary.main",
                }}
              >
                我要招募球友
              </Typography>
              <Checkbox />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/icons/icon_info.svg"
                alt="配置"
                style={{ marginRight: "8px" }}
              />
              <Typography
                variant="body"
                sx={{
                  color: "text.third",
                }}
              >
                還在煩惱找不到球友嗎？有球必IN幫你快速媒合，輕鬆組隊打球！
              </Typography>
            </Box>
          </InfoCardMain>
        ) : (
          <InfoCardSecondary sx={{ margin: "16px 0px" }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h3SemiBold"
                sx={{
                  color: "secondary.main",
                }}
              >
                球友募集中
              </Typography>
              <Checkbox />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/icons/icon_info.svg"
                alt="配置"
                style={{ marginRight: "8px" }}
              />
              <Typography
                variant="body"
                sx={{
                  color: "text.third",
                }}
              >
                還在煩惱找不到球友嗎？名額有限，趕快報團打球吧！
              </Typography>
            </Box>
          </InfoCardSecondary>
        )}

        <Divider />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "text.secondary",
            }}
          >
            場地金額
          </Typography>
          <Typography
            variant="h3SemiBold"
            sx={{
              color: "primary.main",
            }}
          >
            500元
          </Typography>
        </Box>
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
              backgroundColor:
                bookNumber >= 1 ? "secondary.main" : "primary.main",
              color: "white !important",
              borderRadius: "8px",
              padding: "12px",
              boxShadow: "none",
            }}
            onClick={() => {
              handleBooking();
            }}
          >
            {bookNumber >= 1 ? "我要報團" : "預定場地"}
          </Button>
        </Box>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openSnackbar}
          autoHideDuration={2000}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "success.main",
              color: "white",
              padding: 2,
              borderRadius: 1,
            }}
          >
            <CheckCircleOutlineIcon sx={{ mr: 1 }} />
            預定成功!
          </Box>
        </Snackbar>
      </Wrapper>
    </ThemeProvider>
  );
};

export default VenueSubmit;
