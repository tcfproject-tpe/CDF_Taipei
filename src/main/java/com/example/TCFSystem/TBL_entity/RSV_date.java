package com.example.TCFSystem.TBL_entity;

import java.sql.Timestamp;

public class RSV_date {
    private int id;             // 流水號
    private String userId;      // 使用者名稱
    private String courtId;     // 球場ID
    private String period;      // 時段
    private Timestamp createTime;  // 創建時間

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCourtId() {
        return courtId;
    }

    public void setCourtId(String courtId) {
        this.courtId = courtId;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }
}
