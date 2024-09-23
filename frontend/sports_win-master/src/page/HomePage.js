/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-07 16:33:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-08 00:47:05
 * @FilePath: /sports_win/src/page/HomePage.js
 */
/*
 * @Author: Fangyu Kung
 * @Date: 2024-09-07 16:33:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-07 22:49:59
 * @FilePath: /sports_win/src/page/HomePage.js
 */
import { Box, Grid, Link, Typography, CardMedia, Divider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import BaseCard from "../components/card/BaseCardStyle";
import { Wrapper } from "../components/utility/LayoutStyle";
import { theme } from "../style/theme";

const sportsType = [
  {
    name: "羽球",
    path: "badminton",
    img: "/images/Badminton.jpg",
  },
  {
    name: "籃球",
    path: "basketball",
    img: "/images/Basketball.jpg",
  },
  {
    name: "桌球",
    path: "tabletennis",
    img: "/images/TableTennis.jpg",
  },
  {
    name: "排球",
    path: "volleyball",
    img: "/images/Volleyball.jpg",
  },
];
const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <CardMedia
          component="img"
          image="/images/banner.jpg"
          sx={{
            width: "100%",
            margin: "16px 0px",
            borderRadius: "12px",
          }}
        />
        <Divider />
        <Grid container spacing={1.5} marginTop={1}>
          {sportsType.map((item) => (
            <Grid item xs={6} key={item.name}>
              <Link href={`/${item.path}`} sx={{ textDecoration: "none" }}>
                <BaseCard
                  sx={{
                    textAlign: "center",
                    padding: "12px",
                    boxSizing: "border-box",
                    margin: "0px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.img}
                      style={{ width: "100%" }}
                      alt={item.name}
                    />
                    <Typography
                      variant="h3SemiBold"
                      color="primary.main"
                      mt={1}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </BaseCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </ThemeProvider>
  );
};

export default HomePage;
