import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Divider, List, Card, Typography, Tooltip } from "antd";
import { HeartOutlined, PlayCircleOutlined, DownloadOutlined, RiseOutlined } from "@ant-design/icons";
import './HomePage.css';

import axios from "axios";
import { POSTER_PATH } from "../../utils/constant";

const HomePage = () => {

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const { Paragraph } = Typography;
  const gridOptions = {
    gutter: 24,
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
    xxl: 7,
  };

  const stopOnActionIconClick = e => e.stopPropagation();

  const actionIcons = [
    <HeartOutlined key="favourite" onClick={stopOnActionIconClick} />,
    <PlayCircleOutlined key="play" onClick={stopOnActionIconClick} />,
    <DownloadOutlined key="download" onClick={stopOnActionIconClick} />,
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/trending/movie/day");
      setLoading(false);
      setData(res.data.results);
      document.title = "Movies \u2022 Trending";
    } catch (error) {
      setLoading(false);
      setData([]);
      document.title = "Movies";
    }   
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cardClicked = id => history.push(`/movie/${id}`);

  return (
    <div className="HomePage Page">
      <h1 className="text-center">Discover New Movies</h1>
      <Divider orientation="center"><RiseOutlined/> Trending</Divider>
      <List
        loading={loading}
        grid={gridOptions}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              className="custom-card"
              cover={<img className="poster" alt="POSTER" src={POSTER_PATH + item.poster_path} />}
              bodyStyle={{padding: "12px 8px"}}
              actions={actionIcons}
              onClick={() => cardClicked(item.id)}
              >
                <Card.Meta 
                title={<Tooltip placement="topLeft" color="blue" title={item.title}>{item.title}</Tooltip>}
                description={
                  <Paragraph ellipsis={{ rows: 4 }} style={{fontSize:"0.75rem"}}>
                    {item.overview}
                  </Paragraph>} 
                  />
            </Card>
          </List.Item>
        )}
       />
    </div>
  );
}

export default HomePage;
