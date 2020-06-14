import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { PageHeader, Typography, Skeleton, Divider } from "antd";
import { LeftOutlined, EditOutlined, FieldNumberOutlined, UnorderedListOutlined } from "@ant-design/icons";
import './MoviePage.css';

import axios from "axios";
import { POSTER_PATH } from "../../utils/constant";

const MoviePage = ({match}) => {

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const { Paragraph } = Typography;

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
        
      </Skeleton>
    </div>
  );
}

export default MoviePage;
