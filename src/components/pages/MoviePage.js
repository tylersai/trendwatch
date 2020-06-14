import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { PageHeader, Typography, Skeleton, Divider, Descriptions, Badge } from "antd";
import { LeftOutlined, EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import './MoviePage.css';

import axios from "axios";
import { POSTER_PATH, minsToString } from "../../utils/constant";

const MoviePage = ({match}) => {

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const { Paragraph, Text } = Typography;

  const fetchData = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/movie/${id}`);
      console.log(res.data);
      document.title = res.data.title;
      setLoading(false);
      setMovie(res.data);
    } catch (error) {
      console.log(error);
      document.title = "Movies";
      setLoading(false);
      setMovie({});
    }   
  };

  useEffect(() => {
    fetchData(match.params.id);
  }, [match.params.id]);

  const goBack = () => history.goBack();

  return (
    <div className="MoviePage Page">
      <Skeleton
        className="custom-skeleton"
        loading={loading}
        avatar={{style:{borderRadius: "10px", width: "90px", height: "90px"}, shape:"square"}}
        round active>
        <PageHeader
          className="movie-page-header"
          title={movie.title}
          backIcon={<LeftOutlined />}
          onBack={goBack}
          />
        
        <div className="d-flex">
          <div className="img-container" style={{paddingRight: "3vw"}}>
            {movie.poster_path && <img className="poster" alt="POSTER" style={{maxHeight: "300px"}} src={POSTER_PATH + movie.poster_path} />}
          </div>
          <div className="desc-container">
            <Divider><EditOutlined/> Overview</Divider>
            <h3>{movie.title}</h3>
            <Paragraph>{movie.overview}</Paragraph>
          </div>
        </div>
        
        <Divider><UnorderedListOutlined/> Details</Divider>
        <Descriptions>
          {movie.original_title && <Descriptions.Item label="Original Title">{movie.original_title}</Descriptions.Item>}
          {movie.release_date && <Descriptions.Item label="Release Date">{movie.release_date}</Descriptions.Item>}
          {movie.status && <Descriptions.Item label="Status">
              <Text code><Badge status={movie.status === "Released" ? "success":"warning"} text={movie.status}></Badge></Text>
            </Descriptions.Item>}
          {movie.runtime && <Descriptions.Item label="Runtime">{minsToString(movie.runtime)}</Descriptions.Item>}
        </Descriptions>
        
      </Skeleton>
    </div>
  );
}

export default MoviePage;
