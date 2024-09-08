package com.example.TCFSystem.securityConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 為所有路徑啟用 CORS
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // 前端應用的 URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);

//        // 排除特定路徑，不允許跨域
//        registry.addMapping("/api/restricted").allowedOrigins(""); // 禁止 CORS
    }
}