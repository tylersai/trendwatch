import React, { useState, useEffect } from "react";
import { Divider, Typography, Input, Button } from "antd";
import {
  RiseOutlined,
  AlignCenterOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./HomePage.css";
import MovieList from "../ui/MovieList";

import axios from "axios";

const HomePage = ({ location, history }) => {
  const query = location.search
    ? decodeURIComponent(location.search.substr(3))
    : "";

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async (searchQuery = "") => {
    setLoading(true);
    try {
      const res = await axios.get(
        searchQuery
          ? `/search/movie?query=${encodeURIComponent(searchQuery)}`
          : "/trending/movie/day"
      );
      setLoading(false);
      setData(res.data.results);
      document.title = `Trend Watch \u2022 ${
        searchQuery ? `search "${searchQuery}"` : "Trending Movies"
      }`;
    } catch (error) {
      setLoading(false);
      setData([]);
      document.title = "Trend Watch";
    }
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  const getParent = (node) => {
    if (!node.classList.contains("movie-search"))
      return getParent(node.parentElement);
    else return node.firstChild;
  };

  const goSearch = (value, event) => {
    const searchQuery = value ? value.trim() : "";
    if (searchQuery) {
      let toBlur = getParent(event.target);
      toBlur.blur();
      history.push(`/home?q=${encodeURIComponent(searchQuery)}`);
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
        defaultValue={query}
        onSearch={goSearch}
        placeholder="e.g. Harry Potter, Twilight, Titanic,..."
      />

      {query ? (
        <>
          <Divider orientation="center">
            <AlignCenterOutlined /> Search Results
          </Divider>
          <div className="res-toolbar">
            <Typography.Text type="secondary">
              Showing results for <strong>"{query}"</strong>
            </Typography.Text>
            <Button
              size="small"
              shape="round"
              danger
              onClick={() => history.push("/home")}
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

      <MovieList loading={loading} data={data} />
    </div>
  );
};

export default HomePage;
