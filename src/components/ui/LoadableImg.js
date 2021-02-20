import React, { useEffect, useState } from "react";
import "./LoadableImg.css";
import { POSTER_PATH } from "../../utils/constant";
import { PictureOutlined } from "@ant-design/icons";

const LoadableImg = ({ posterPath }) => {
  const [loading, setLoading] = useState(true);
  const [dataUrl, setDataUrl] = useState(null);

  const fetchImg = async () => {
    try {
      setLoading(true);
      const res = await fetch(POSTER_PATH + posterPath);
      const blobData = await res.blob();
      setLoading(false);
      setDataUrl(URL.createObjectURL(blobData));
    } catch (error) {
      setLoading(false);
      dataUrl !== null && setDataUrl(null);
    }
  };

  useEffect(() => {
    fetchImg();
    // eslint-disable-next-line
  }, [posterPath]);

  if (loading || dataUrl === null) {
    return (
      <div className="poster-placeholder">
        <PictureOutlined style={{ fontSize: "42px", opacity: "0.7" }} />
      </div>
    );
  }
  const createImg = () => {
    const img = React.createElement("img", {
      className: "poster",
      src: dataUrl,
      onLoad: () => {
        URL.revokeObjectURL(dataUrl);
      },
    });
    return img;
  };
  // return <img className="poster" alt="POSTER" src={dataUrl} />;
  return createImg();
};

export default LoadableImg;
