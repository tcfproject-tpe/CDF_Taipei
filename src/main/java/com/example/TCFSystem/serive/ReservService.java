package com.example.TCFSystem.serive;


import com.example.TCFSystem.TBL_entity.CourtInfo;
import com.example.TCFSystem.TBL_entity.RSV_date;
import com.example.TCFSystem.dao.ReserveDao;
import com.example.TCFSystem.dto.GetCourtsStatusInfo;
import com.example.TCFSystem.dto.RSVInfoReq;
import com.example.TCFSystem.dto.resp.BookCourt_resp;
import com.example.TCFSystem.dto.resp.CourtsStatus_resp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Component
public class ReservService {

    @Autowired
    ReserveDao reserveDao;

    @Value("${send.mail.url}")
    String sendmailURL;

    @Transactional
    public BookCourt_resp bookCourt(RSVInfoReq rsvInfo) throws IOException {

        BookCourt_resp bookCourt_resp=new BookCourt_resp();  //回給前端

        String userId=rsvInfo.getUserId();
        String date=rsvInfo.getDate();
        String period=rsvInfo.getPeriod();
        String courtId=rsvInfo.getCourtId();

        List<RSV_date> rsv_dateList=reserveDao.getBookStatus(courtId,date,period);  //取的指定場地預定狀況by 日期時間
        //確認該場地是否可預約
            //**不可預約
                //如果該場地已被與約滿4次則不可再約==> 去DB查場地時段人數
                //如同一個user約過也不可以再約  ==>場地時段人名
            //**可預約
            //若預約人樹結介於1~3可預約

        if (rsv_dateList.size()>3){
            bookCourt_resp.setStatus("fail");
            bookCourt_resp.setMessage( "預約失敗，人數已滿");
            System.out.println("預約失敗，人數已滿");
            return bookCourt_resp;
        }
        for (RSV_date rsv_date:rsv_dateList){

            if (rsv_date.getUserId().equals(userId)){
                bookCourt_resp.setStatus("fail");
                bookCourt_resp.setMessage( "預約失敗，重複預約");
                System.out.println("預約失敗，重複預約");
                return bookCourt_resp;
            }
        }

        //訂閱場地
        int insertAMT=reserveDao.makeRVS(rsvInfo);

        bookCourt_resp.setStatus("success");
        bookCourt_resp.setMessage( "預約成功");
        bookCourt_resp.setDate(rsvInfo.getDate());
        bookCourt_resp.setPeriod(rsvInfo.getPeriod());

        CourtInfo courtInfo=reserveDao.getCourtByCourtId(courtId).get(0);
        String courtName=courtInfo.getCourt()+"-"+courtInfo.getName();
        bookCourt_resp.setCourtName(courtName);

        //sendMail;
        boolean checkOK = false;
        try{
            checkOK=sendMai(rsvInfo,courtName);
        }catch (Exception ex){
            ex.printStackTrace();
            checkOK=true;
        }

//        boolean checkOK=true;
        if (!checkOK){
            bookCourt_resp.setMessage( "預約成功,但mail發送失敗");
        }
        return bookCourt_resp;
    }


    public boolean sendMai(RSVInfoReq rsvInfoReq,String courtName) throws IOException {

        String urlString = sendmailURL;
        System.out.println(urlString);
        URL url = new URL(urlString);

        // 發起請求
        HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
        httpURLConnection.setRequestMethod("POST");
        httpURLConnection.setRequestProperty("Content-Type", "application/json");
        httpURLConnection.setRequestProperty("Accept", "application/json");
        httpURLConnection.setRequestProperty("ngrok-skip-browser-warning", "true");

        // 設置doOutput為true，表示可以向服務器寫入數據
        httpURLConnection.setDoOutput(true);

        // 6. 要發送的數據（例如 JSON 字符串）
        String booktime=  rsvInfoReq.getDate()+"  "+rsvInfoReq.getPeriod();
        String jsonInputString ="{\"name\": \""+ rsvInfoReq.getUserId()+"\",\"reservation_details\": \""+courtName+"\" ,\"date_time\": \""+booktime+"\"}";
        System.out.println("jsonInputString "+jsonInputString);
        // 7. 將數據寫入請求體中
        try (OutputStream os = httpURLConnection.getOutputStream()) {
            byte[] input = jsonInputString.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // 8. 讀取響應
        int responseCode = httpURLConnection.getResponseCode();
        System.out.println("Response Code: " + responseCode);


        String isSendOK="fail";
        // 9. 如果響應碼為 200-299，則讀取響應內容
        try (BufferedReader br = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            isSendOK=response.toString();
            System.out.println("Response: " + isSendOK);
        }

        if (isSendOK.equals("success")){
            return true;
        }
        return false;

    }

    public List<CourtsStatus_resp> getCourtsStatus(GetCourtsStatusInfo getCourtsStatusInfo) {

        List<CourtsStatus_resp> courtsStatus_resps= new ArrayList<>();
        //todo 取得場館資訊
        List<CourtInfo>courtInfos=reserveDao.getCourtByDistrict(getCourtsStatusInfo);

        //todo 取得場地訂閱狀況

        for (CourtInfo courtInfo:courtInfos){
            //單日期+單時段

            String date= getCourtsStatusInfo.getDate();
            if (date.equalsIgnoreCase("all")){  //全日期+全時段
                //全日期
                List<String> dateList=getDateList();
                for (String day:dateList){
                    List<RSV_date> rsv_dateList=reserveDao.getBookStatus(courtInfo.getId(),day,getCourtsStatusInfo.getPeriod());

                    boolean reserveStatus=false;
                    if (rsv_dateList.size()<4){
                        reserveStatus=true;
                    }
                    for (RSV_date rsv_date:rsv_dateList){
                        CourtsStatus_resp courtsStatus_resp=new CourtsStatus_resp();
                        courtsStatus_resp.setCourtId(courtInfo.getId());
                        courtsStatus_resp.setDistrict(courtInfo.getDistrict());
                        courtsStatus_resp.setName(courtInfo.getName());
                        courtsStatus_resp.setDate(getCourtsStatusInfo.getDate());
                        courtsStatus_resp.setAddress(courtInfo.getAddress());
                        courtsStatus_resp.setPeriod(rsv_date.getPeriod());
                        courtsStatus_resp.setReserveStatus(reserveStatus);
                        courtsStatus_resps.add(courtsStatus_resp);
                    }
                }
            }else {
                //單一日期
                String period= getCourtsStatusInfo.getPeriod();
                List<RSV_date> rsv_dateList=reserveDao.getBookStatus(courtInfo.getId(),date,period);
                boolean reserveStatus=false;
                int amt=rsv_dateList.size();
                if (rsv_dateList.size()<4){
                    reserveStatus=true;
                }

                if (getCourtsStatusInfo.getPay().equalsIgnoreCase("0")){
                    CourtsStatus_resp courtsStatus_resp=new CourtsStatus_resp();
                    courtsStatus_resp.setCourtId(courtInfo.getId());
                    courtsStatus_resp.setDistrict(courtInfo.getDistrict());
                    courtsStatus_resp.setName(courtInfo.getCourt());
                    courtsStatus_resps.add(courtsStatus_resp);
                }else {
                    CourtsStatus_resp courtsStatus_resp=new CourtsStatus_resp();
                    courtsStatus_resp.setCourtId(courtInfo.getId());
                    courtsStatus_resp.setDistrict(courtInfo.getDistrict());
                    courtsStatus_resp.setName(courtInfo.getCourt());
                    courtsStatus_resp.setDate(getCourtsStatusInfo.getDate());
                    courtsStatus_resp.setAddress(courtInfo.getAddress());
                    courtsStatus_resp.setPeriod(getCourtsStatusInfo.getPeriod().replace("\"",""));
                    courtsStatus_resp.setReserveStatus(reserveStatus);
                    courtsStatus_resp.setAmount(amt);
                    courtsStatus_resps.add(courtsStatus_resp);}




            }
        }
        return courtsStatus_resps ;


    }

    private List<String> getDateList() {
        List<String> dateList=new ArrayList<>();
        // 取得當前日期
        LocalDate today = LocalDate.now();

        // 加 7 天
        LocalDate nextWeek ;
        for (int i=0 ;i<7;i++){
            nextWeek= today.plusDays(1);

            // 定義日期時間格式
            DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyyMMdd");
            dateList.add(nextWeek.format(formatter1));
        }

        return dateList;
    }
}
