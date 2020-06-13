import React, { useState, useEffect } from 'react';
import { Divider, List, Card } from "antd";
import { HeartOutlined, PlayCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import './HomePage.css';

import axios from "axios";
import { POSTER_PATH } from "../../utils/constant";

function HomePage() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const gridOptions = {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 4,
    lg: 4,
    xl: 6,
    xxl: 3,
  };
  const actionIcons = [
    <HeartOutlined key="favourite" />,
    <PlayCircleOutlined key="play" />,
    <DownloadOutlined key="download" />,
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/trending/movie/week");
      console.log(res.data);
      setLoading(false);
      setData(res.data.results);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setData([]);
    }   
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="HomePage Page">
      <h2>Movies</h2>
      <Divider orientation="center">Trending</Divider>
      <List
        loading={loading}
        grid={gridOptions}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card
              cover={<img className="poster" alt="POSTER" src={POSTER_PATH + item.poster_path} />}
              bodyStyle={{padding: "12px 8px"}}
              actions={actionIcons}
              >
                <Card.Meta title={item.title} />
            </Card>
          </List.Item>
        )}
       />
    </div>
  );
}

export default HomePage;
