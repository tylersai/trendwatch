import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Divider, List, Card, Typography, Tooltip, Input, Button } from "antd";
import {
  HeartOutlined,
  PlayCircleOutlined,
  DownloadOutlined,
  RiseOutlined,
  AlignCenterOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./HomePage.css";

import axios from "axios";
import LoadableImg from "../ui/LoadableImg";

const HomePage = () => {
  const history = useHistory();

  const [query, setQuery] = useState("");
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

  const stopOnActionIconClick = (e) => e.stopPropagation();

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
      document.title = "Trend Watch \u2022 Trending Movies";
    } catch (error) {
      setLoading(false);
      setData([]);
      document.title = "Trend Watch";
    }
  };

  useEffect(() => {
    if (!query) {
      fetchData();
    }
  }, [query]);

  const searchData = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/search/movie?query=${encodeURIComponent(searchQuery)}`
      );
      setLoading(false);
      setData(res.data.results);
      document.title = `Trend Watch \u2022 "${searchQuery}"`;
    } catch (error) {
      setLoading(false);
      setData([]);
      document.title = "Trend Watch";
    }
    setQuery(searchQuery);
  };

  const cardClicked = (id) => history.push(`/movie/${id}`);

  const getParent = (node) => {
    if (!node.classList.contains("movie-search"))
      return getParent(node.parentElement);
    else return node.firstChild;
  };

  const goSearch = (value, event) => {
    const searchQuery = value ? value.trim() : "";
    if (searchQuery) {
      searchData(searchQuery);
      let toBlur = getParent(event.target);
      toBlur.blur();
    }
  };

  return (
    <div className="HomePage Page">
      <h1 className="text-center">Discover New Movies</h1>
      <Input.Search
        size="large"
        className="movie-search"
        style={{
          maxWidth: "600px",
          margin: "10px auto",
          display: "flex",
          borderRadius: "10px",
        }}
        onSearch={goSearch}
        placeholder="e.g. Harry Potter, Twilight, Titanic,..."
      />

      {query && query.trim() ? (
        <>
          <Divider orientation="center">
            <AlignCenterOutlined /> Search Results
          </Divider>
          <div className="res-toolbar">
            <Typography.Text type="secondary">
              Showing results for <strong>"{query.trim()}"</strong>
            </Typography.Text>
            <Button
              size="small"
              shape="round"
              danger
              onClick={() => setQuery("")}
            >
              <CloseCircleOutlined /> Clear
            </Button>
          </div>
        </>
      ) : (
        <Divider orientation="center">
          <RiseOutlined /> Trending
        </Divider>
      )}

      <List
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
    </div>
  );
};

export default HomePage;
