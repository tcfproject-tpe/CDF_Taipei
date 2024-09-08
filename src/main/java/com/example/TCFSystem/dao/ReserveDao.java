package com.example.TCFSystem.dao;

import com.example.TCFSystem.TBL_entity.CourtInfo;
import com.example.TCFSystem.TBL_entity.RSV_date;
import com.example.TCFSystem.dto.GetCourtsStatusInfo;
import com.example.TCFSystem.dto.RSVInfoReq;

import java.util.List;

public interface ReserveDao {

    public int makeRVS(RSVInfoReq RSVInfoReq);

    List<RSV_date> getBookStatus(String courtId, String date, String period);

    List<CourtInfo> getCourtByCourtId(String courtId);

    List<CourtInfo> getCourtByDistrict(GetCourtsStatusInfo getCourtsStatusInfo);
}
