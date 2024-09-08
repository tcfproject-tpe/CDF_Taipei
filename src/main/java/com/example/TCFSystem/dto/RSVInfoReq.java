package com.example.TCFSystem.dto;

public class RSVInfoReq {

    private String userId;   // 使用者名稱
    private String courtId;  // 球場ID
    private String date;      // 日期
    private String period;      // 時段

    public String getCourtId() {
        return courtId;
    }

    public void setCourtId(String courtId) {
        this.courtId = courtId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


}
