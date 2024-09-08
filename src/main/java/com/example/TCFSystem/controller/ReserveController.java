package com.example.TCFSystem.controller;


import com.example.TCFSystem.dto.GetCourtsStatusInfo;
import com.example.TCFSystem.dto.RSVInfoReq;
import com.example.TCFSystem.dto.resp.BookCourt_resp;
import com.example.TCFSystem.dto.resp.CourtsStatus_resp;
import com.example.TCFSystem.serive.ReservService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class ReserveController {
    @Autowired
    ReservService reservService;


    //ok
    @PostMapping("/book_court")
    public ResponseEntity<BookCourt_resp> bookCourt(@RequestBody RSVInfoReq rsvInfo) throws IOException {
        rsvInfo.setDate(rsvInfo.getDate().replace("/",""));
        System.out.println("rsvInfo.getDate: "+rsvInfo.getDate());
        BookCourt_resp bookCourt_resp=reservService.bookCourt(rsvInfo);
        return ResponseEntity.ok() .header("Content-Type", "application/json").body(bookCourt_resp);
    }


    @GetMapping("/courts_status")
    public ResponseEntity<List<CourtsStatus_resp>> getCourtsStatus(
            @RequestParam(value = "category",defaultValue = "all") String category,
            @RequestParam(value = "pay",defaultValue = "1") String pay,
            @RequestParam(value = "district",defaultValue = "all") String district,
            @RequestParam(value = "isBook",defaultValue = "false") boolean isBook,
            @RequestParam(value = "date",defaultValue = "today") String date,
            @RequestParam(value = "period",defaultValue = "all") String period){

        if (date.equalsIgnoreCase("today")){
            date=getToday();
        }
        GetCourtsStatusInfo getCourtsStatusInfo=new GetCourtsStatusInfo();
        getCourtsStatusInfo.setCategory(category);
        getCourtsStatusInfo.setPay(pay);
        getCourtsStatusInfo.setDistrict(district);
        getCourtsStatusInfo.setDate(date.replace("/",""));
        getCourtsStatusInfo.setPeriod(period);

        List<CourtsStatus_resp> CourtsStatus_respList=reservService.getCourtsStatus(getCourtsStatusInfo);
        //todo 做7天變數

        return ResponseEntity.ok() .header("Content-Type", "application/json").body(CourtsStatus_respList);
    }




    public String getJsonStringFromURL(String urlStr) throws IOException {
        String urlString = urlStr;
        URL url = new URL(urlString);

        //確認是否可以上網
//        if (!isInternetAvailable()){
//            System.out.println("Bro! you have suck connection");
//            throw new RuntimeException("internet is interrupted : 網路無法連接");
//        }

        // 發起請求
        HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
        httpURLConnection.setRequestMethod("GET");

        //連線失敗直接報錯
        try {
            if (httpURLConnection.getResponseCode() != 200) {
                System.out.println("Taipei Government's url connectted but wrong");
                return null;
            }
        } catch (Exception ex) {
            System.out.println("Taipei Government's url connectted fail");
            return null;
        }


        // API讀取成功在回應
        BufferedReader in = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
        StringBuilder jsonStr = new StringBuilder();
        String lineOutput;

        // 讀取回應資料
        while ((lineOutput = in.readLine()) != null) {
            jsonStr.append(lineOutput);
        }
        in.close();
        System.out.println(jsonStr);
        return jsonStr.toString();
    }


    public static boolean isInternetAvailable() {
        try {
            InetAddress address = InetAddress.getByName("8.8.8.8");
            return address.isReachable(3000); // 試著在 3 秒內連接到 Google 的 DNS
        } catch (IOException e) {
            return false; // 無法連接時回傳 false
        }

    }


    public String getToday(){
        // 取得當天日期
        LocalDate today = LocalDate.now();

        // 定義日期格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        // 使用格式化器格式化日期
        String formattedDate = today.format(formatter);
        return formattedDate;
    }
}
