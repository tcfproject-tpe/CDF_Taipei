package com.example.TCFSystem.rowmapper;


import com.example.TCFSystem.TBL_entity.RSV_date;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
public class RSV_dateRowMapper implements RowMapper<RSV_date> {

    @Override
    public RSV_date mapRow(ResultSet rs, int rowNum) throws SQLException {
        RSV_date rsv_date=new RSV_date();
        rsv_date.setUserId(rs.getString("user_id"));
        rsv_date.setPeriod(rs.getString("period"));
        rsv_date.setCourtId(rs.getString("court_id"));
        return rsv_date;

    }
}
