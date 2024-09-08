package com.example.TCFSystem.rowmapper;

import com.example.TCFSystem.TBL_entity.CourtInfo;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class CourtInfoRowMapper implements RowMapper<CourtInfo> {

    @Override
    public CourtInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
        CourtInfo courtInfo=new CourtInfo();
        courtInfo.setId(rs.getString("id"));
        courtInfo.setCourt(rs.getString("name"));
        courtInfo.setName(rs.getString("category"));
        courtInfo.setAddress(rs.getString("address"));
        courtInfo.setDistrict(rs.getString("district"));
        return courtInfo;
    }
}
