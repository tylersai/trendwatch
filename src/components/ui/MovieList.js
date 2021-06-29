import {
  DownloadOutlined,
  PlayCircleOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Card, List, Typography, Tooltip } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import LoadableImg from "./LoadableImg";
import "./MovieList.css";

const gridOptions = {
  gutter: 24,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 5,
  xl: 6,
  xxl: 7,
};

const MovieList = ({ loading, data = [] }) => {
  const { Paragraph } = Typography;
  const history = useHistory();

  const stopOnActionIconClick = (e) => e.stopPropagation();

  const actionIcons = [
    <HeartOutlined key="favourite" onClick={stopOnActionIconClick} />,
    <PlayCircleOutlined key="play" onClick={stopOnActionIconClick} />,
    <DownloadOutlined key="download" onClick={stopOnActionIconClick} />,
  ];

  const cardClicked = (id) => history.push(`/movie/${id}`);

  return (
    <List
      className="MovieList"
      loading={loading}
      grid={gridOptions}
      dataSource={data.filter((m) => m.poster_path)}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            className="custom-card"
            cover={<LoadableImg posterPath={item.poster_path} />}
            bodyStyle={{ padding: "12px 8px" }}
            actions={actionIcons}
            onClick={() => cardClicked(item.id)}
          >
            <Card.Meta
              title={
                <Tooltip placement="topLeft" color="blue" title={item.title}>
                  {item.title}
                </Tooltip>
              }
              description={
                <Paragraph
                  ellipsis={{ rows: 4 }}
                  style={{ fontSize: "0.75rem" }}
                >
                  {item.overview}
                </Paragraph>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default MovieList;
