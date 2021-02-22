import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  PageHeader,
  Typography,
  Skeleton,
  Divider,
  Descriptions,
  Badge,
  Rate,
  Empty,
} from "antd";
import {
  LeftOutlined,
  EditOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "./MoviePage.css";

import axios from "axios";
import { minsToString } from "../../utils/constant";
import Popularity from "../ui/Popularity";
import LoadableImg from "../ui/LoadableImg";

const MoviePage = ({ match }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const { Paragraph, Text } = Typography;

  const fetchData = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/movie/${id}`);
      document.title = res.data.title;
      setLoading(false);
      setMovie(res.data);
    } catch (error) {
      document.title = "Trend Watch";
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
        avatar={{
          style: {
            borderRadius: "10px",
            width: "90px",
            marginTop: "10px",
            height: "90px",
          },
          shape: "square",
        }}
        round
        active
      >
        {movie.id ? (
          <div className="fade-in">
            <PageHeader
              className="movie-page-header"
              title={movie.title}
              backIcon={<LeftOutlined />}
              onBack={goBack}
            />

            <div className="d-flex">
              <div className="img-container" style={{ paddingRight: "3vw" }}>
                <LoadableImg posterPath={movie.poster_path} />
              </div>
              <div className="desc-container">
                <Divider>
                  <EditOutlined /> Overview
                </Divider>
                <h3 className="movie-title">{movie.title}</h3>
                <Rate
                  disabled
                  allowHalf
                  value={
                    movie.vote_average ? Math.round(movie.vote_average) / 2 : 0
                  }
                />
                <Text className="vote-count" type="secondary">{`(${
                  movie.vote_count ? movie.vote_count : 0
                })`}</Text>
                <Paragraph>{movie.overview}</Paragraph>
              </div>
            </div>

            <Divider>
              <UnorderedListOutlined /> Details
            </Divider>
            <Descriptions className="movie-detail">
              {movie.original_title && (
                <Descriptions.Item label="Original Title">
                  {movie.original_title}
                </Descriptions.Item>
              )}
              {movie.status && (
                <Descriptions.Item label="Status">
                  <Text code>
                    <Badge
                      status={
                        movie.status === "Released" ? "success" : "warning"
                      }
                      text={movie.status}
                    ></Badge>
                  </Text>
                </Descriptions.Item>
              )}
              {movie.release_date && (
                <Descriptions.Item label="Release Date">
                  {movie.release_date}
                </Descriptions.Item>
              )}
              {movie.runtime && (
                <Descriptions.Item label="Runtime">
                  {minsToString(movie.runtime)}
                </Descriptions.Item>
              )}
              {movie.popularity && (
                <Descriptions.Item label="Popularity">
                  <Popularity>{movie.popularity}</Popularity>
                </Descriptions.Item>
              )}
              {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                <Descriptions.Item label="Spoken Languages">
                  {movie.spoken_languages.map((lan) => lan.name).join(", ")}
                </Descriptions.Item>
              )}
              {movie.genres && movie.genres.length > 0 && (
                <Descriptions.Item label="Genres">
                  {movie.genres.map((g) => (
                    <Text key={g.id} code>
                      {g.name}
                    </Text>
                  ))}
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        ) : (
          <Empty
            style={{ marginTop: "25px" }}
            image={Empty.PRESENTED_IMAGE_DEFAULT}
          />
        )}
      </Skeleton>
    </div>
  );
};

export default MoviePage;
