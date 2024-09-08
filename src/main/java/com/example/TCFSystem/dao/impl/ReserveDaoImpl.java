package com.example.TCFSystem.dao.impl;

import com.example.TCFSystem.TBL_entity.CourtInfo;
import com.example.TCFSystem.TBL_entity.RSV_date;
import com.example.TCFSystem.dao.ReserveDao;
import com.example.TCFSystem.dto.GetCourtsStatusInfo;
import com.example.TCFSystem.dto.RSVInfoReq;
import com.example.TCFSystem.rowmapper.CourtInfoRowMapper;
import com.example.TCFSystem.rowmapper.RSV_dateRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;


@Component
public class ReserveDaoImpl implements ReserveDao {

    @Autowired
    NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    @Autowired
    RSV_dateRowMapper rsv_dateRowMapper;

    @Autowired
    CourtInfoRowMapper courtInfoRowMapper;

    @Override
    public int makeRVS(RSVInfoReq RSVInfoReq) {
        String tblDate="rsv_"+RSVInfoReq.getDate().substring(0,RSVInfoReq.getDate().length());    //取得日期
        String sql = " INSERT INTO "+tblDate+" (user_id, court_id, period) VALUES(:userId,:courtId, :period)";
        // 使用 Map 來設定命名參數
        HashMap<String, Object> params = new HashMap<>();
        params.put("userId", RSVInfoReq.getUserId());
        params.put("courtId", RSVInfoReq.getCourtId());
        params.put("period", RSVInfoReq.getPeriod());

        int insertAMT=namedParameterJdbcTemplate.update(sql,params);
        return insertAMT;
    }

    @Override
    public List<RSV_date> getBookStatus(String courtId, String date, String period) {
        String tblName="rsv_"+date;
        String sql ="select * from "+tblName+" r where court_id =:courtId ";
        if (!period.equalsIgnoreCase("all")){
            sql ="select * from "+tblName+" r where court_id =:courtId AND period =:period";
        }
        System.out.println("getBookStatus SQL: "+sql);

        HashMap<String, Object> params = new HashMap<>();
        params.put("courtId",courtId);
        params.put("period", period);
        List<RSV_date> RSV_dateList=namedParameterJdbcTemplate.query(sql,params,rsv_dateRowMapper);
        return RSV_dateList;
    }


    /**
     * 用ID取得場地資訊
     * @param courtId
     * @return
     */
    @Override
    public  List<CourtInfo> getCourtByCourtId(String courtId) {

        String sql ="SELECT  id,category ,district,name,address FROM court_info WHERE id =:id";
        HashMap<String, Object> params = new HashMap<>();
        params.put("id",courtId);

        System.out.println(sql);
        List<CourtInfo> courtInfos=namedParameterJdbcTemplate.query(sql,params,courtInfoRowMapper);


        return courtInfos;
    }

    @Override
    public List<CourtInfo> getCourtByDistrict(GetCourtsStatusInfo getCourtsStatusInfo) {
        String sql="SELECT  id,category ,district,name,address FROM court_info WHERE availability_status LIKE '%付費%' ";
        //是否收費
        if (getCourtsStatusInfo.getPay().equalsIgnoreCase("0")){
            sql="SELECT  id,category ,district,name,address FROM court_info WHERE availability_status LIKE  '%免費%' ";
        }

        //種類
        if (!getCourtsStatusInfo.getCategory().equalsIgnoreCase("All")){
            String cateo=null;
            String aa=  getCourtsStatusInfo.getCategory();
            if (aa.equalsIgnoreCase("volleyball")){
                cateo="排球";
            } else if (aa.equalsIgnoreCase("basketball")) {
                cateo="籃球";
            }else if(aa.equalsIgnoreCase("badminton")){
                cateo="羽球";
            }else if(aa.equalsIgnoreCase("tabletennis")){
                cateo="桌球";
            }
            sql=sql+" and category like '%"+cateo+"%'";
        }

        // 行政區
        if (!getCourtsStatusInfo.getDistrict().equalsIgnoreCase("all")){
            String district=getCourtsStatusInfo.getDistrict();
            sql=sql+" and district  like '%"+district+"%'";
        }
        System.out.println("getCourtByDistrict: " +sql);

        HashMap<String, Object> params = new HashMap<>();
//        params.put("district",district);

        System.out.println(sql);
        List<CourtInfo> courtInfos=namedParameterJdbcTemplate.query(sql,params,courtInfoRowMapper);
        return  courtInfos;
    }


}
