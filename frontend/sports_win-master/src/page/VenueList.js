/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-07 16:27:55
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 08:20:27
 * @FilePath: /sports_win/src/page/VenueList.js
 */
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueList } from "../api/getVenueList";
import ColorButton from "../components/button/ColorButton";
import { Wrapper } from "../components/utility/LayoutStyle";
import { BaseSelect } from "../components/utility/SelectStyle";
import VenueCard from "../components/venueList/VenueCard";
import { taipeiDistricts, timeSlots } from "../data/data";
import { theme } from "../style/theme";
const VenueList = () => {
  const { sport } = useParams();

  const [value, setValue] = useState(1);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [dateValue, setDateValue] = useState(dayjs().format("YYYY/MM/DD"));

  const [venueList, setVenueList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearch = () => {
    fetchVenueList();
    setSearchTrigger((prev) => prev + 1);
  };

  const fetchVenueList = async () => {
    setIsLoading(true);
    try {
      const params = {
        category: sport,
        pay: value,
        district: selectedDistrict,
      };

      if (value !== 0) {
        params.date = dateValue;
        params.period = selectedTime;
      }
      const response = await getVenueList(params);
      setVenueList(response.data);
    } catch (error) {
      console.error("获取失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVenueList();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Box sx={{ width: "100%", color: theme.palette.white.main }}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              textColor="primary.main"
              indicatorColor="primary.main"
              sx={{
                "& .MuiTabs-flexContainer": {
                  justifyContent: "space-between",
                },
                "& .MuiTab-root": {
                  flex: 1,
                  maxWidth: "none",
                  color: theme.palette.text.secondary,
                },
                "& .Mui-selected": {
                  color: theme.palette.primary.main,
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              <Tab value={1} label="付費場地" />
              <Tab value={0} label="免費場地" />
            </Tabs>
          </Box>
        </Box>
        {value === 1 ? (
          <>
            <Box mt={4}>
              <FormControl fullWidth>
                <InputLabel id="district-select-label">選擇行政區</InputLabel>
                <BaseSelect
                  labelId="district-select-label"
                  id="district-select"
                  value={selectedDistrict}
                  defaultValue={"All"}
                  label="選擇行政區"
                  onChange={handleDistrictChange}
                >
                  <MenuItem value="All">全部</MenuItem>
                  {taipeiDistricts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </BaseSelect>
              </FormControl>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="日期"
                      value={dayjs(dateValue, "YYYY/MM/DD")}
                      onChange={(newValue) => {
                        const formattedDate = newValue
                          ? newValue.format("YYYY/MM/DD")
                          : "";
                        console.log(formattedDate);
                        setDateValue(formattedDate);
                      }}
                      format="YYYY/MM/DD"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            "& .MuiInputBase-root": {
                              borderRadius: "10px",
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="site-type-select-label">
                      選擇時間
                    </InputLabel>
                    <BaseSelect
                      labelId="site-type-select-label"
                      id="site-type-select"
                      value={selectedTime}
                      defaultValue={"08:00-09:00"}
                      label="選擇時間"
                      onChange={handleTimeChange}
                    >
                      {timeSlots.map((time, index) => {
                        return (
                          <MenuItem key={index} value={time}>
                            {time}
                          </MenuItem>
                        );
                      })}
                    </BaseSelect>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <ColorButton mt={2} onClick={handleSearch}>
              查詢
            </ColorButton>
            <Box>
              {venueList.map((item) => {
                return <VenueCard key={item.id} info={item} isFree={false} />;
              })}
            </Box>
          </>
        ) : (
          <>
            <Box mt={4}>
              <FormControl fullWidth>
                <InputLabel id="district-select-label">選擇行政區</InputLabel>
                <BaseSelect
                  labelId="district-select-label"
                  id="district-select"
                  value={selectedDistrict}
                  defaultValue={"All"}
                  label="選擇行政區"
                  onChange={handleDistrictChange}
                >
                  <MenuItem value="All">全部</MenuItem>
                  {taipeiDistricts.map((district, index) => (
                    <MenuItem key={index} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </BaseSelect>
              </FormControl>
              <ColorButton mt={2} onClick={handleSearch}>
                查詢
              </ColorButton>
              <Box>
                {venueList.length !== 0 ? (
                  venueList.map((item) => {
                    return (
                      <VenueCard key={item.id} info={item} isFree={true} />
                    );
                  })
                ) : (
                  <image src="/images/nodata.webp"></image>
                )}
              </Box>
            </Box>
          </>
        )}
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {venueList.map((item) => {
              return (
                <VenueCard key={item.id} info={item} isFree={value === 0} />
              );
            })}
          </Box>
        )}
      </Wrapper>
    </ThemeProvider>
  );
};

export default VenueList;
