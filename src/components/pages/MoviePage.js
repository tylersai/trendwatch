import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { PageHeader, Typography, Skeleton } from "antd";
import { LeftOutlined } from "@ant-design/icons";
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
      setLoading(false);
      setMovie(res.data);
    } catch (error) {
      console.log(error);
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
      <Skeleton loading={loading} avatar={{style:{borderRadius: "10px", width: "100px", height: "100px"}, shape:"square"}} round active>
        <PageHeader
          className="movie-page-header"
          title={movie.title}
          backIcon={<LeftOutlined />}
          onBack={goBack}
          />
        <img className="poster" alt="POSTER" style={{maxHeight: "300px"}} src={POSTER_PATH + movie.poster_path} />
        <br />
        <br />
        <Paragraph>{movie.overview}</Paragraph>
      </Skeleton>
    </div>
  );
}

export default MoviePage;
