/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// 自定义样式的 Card
const CardContainer = styled.div`
  max-width: 100%;
  background-color: #f1f3f4;
  border-radius: 16px;
  padding: 12px;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`;

// 标题的容器
const CardHeader = styled.div`
  background-color: #f1f3f4;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: #30383d;
`;

// 标题的样式
const CardTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: bold;
`;

// 内容区域的样式
const CardContent = styled.div`
  padding-left: 12px;
  border-radius: 16px;
  background-color: #f1f3f4;
  display: ${({ expanded }) => (expanded ? "block" : "none")};
  transition: max-height 0.3s ease;
`;

// 可重用的 ToggleCard 组件
const ToggleCard = ({ title, subtitle = [], content = [], subcontent = [] }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <CardContainer>
      <CardHeader onClick={handleToggle}>
        <CardTitle>{title}</CardTitle>
        <span>{expanded ? "▲" : "▼"}</span> {/* 简单的展开/收起图标 */}
      </CardHeader>
      <CardContent expanded={expanded}>
      <h5
          css={css`
            margin: 0;
            color: #475259;
            font-size: 0.875rem;
            font-weight:400;
          `}
        >
          {content}
        </h5>
        <h5
          css={css`
            margin: 0;
            color: #475259;
            font-size: 0.875rem;
            padding-top:12px;
          `}
        >
          {subtitle}
        </h5>
        <h5
          css={css`
            margin: 0;
            color: #475259;
            font-size: 0.875rem;
            font-weight:400;
            padding-top:4px;
          `}
        >
          {subcontent}
        </h5>
      </CardContent>
    </CardContainer>
  );
};

export default ToggleCard;
