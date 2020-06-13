import React, { useState, useEffect } from 'react';
import { Divider, List, Card, Typography, Tooltip } from "antd";
import './MoviePage.css';

import axios from "axios";
import { POSTER_PATH } from "../../utils/constant";

const MoviePage = ({match}) => {

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

  return (
    <div className="MoviePage Page">
      {
        loading ? null:
        (
          <>
            <img className="poster" alt="POSTER" style={{maxHeight: "300px"}} src={POSTER_PATH + movie.poster_path} />
            <h2>{movie.title}</h2>
            <Paragraph>{movie.overview}</Paragraph>
          </>
        )
      }
    </div>
  );
}

export default MoviePage;
