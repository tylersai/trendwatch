import React, { useState, useEffect } from 'react';
import { Button } from "antd";
import './HomePage.css';

import axios from "axios";
import { POSTER_PATH } from "../../utils/constant";

function HomePage() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get("/trending/movie/week");
    console.log(res.data);
    setLoading(false);
    setData(res.data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="HomePage">
      <h2>Hello World</h2>
      <Button type="primary">Click Me</Button>
      <h3>{data.length}</h3>
    </div>
  );
}

export default HomePage;
