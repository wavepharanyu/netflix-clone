import React, { useEffect, useState } from "react";
import "./Player.css";
import backArrowIcon from "../../assets/back_arrow_icon.png";
import { Link, useNavigate, useParams } from "react-router-dom";

const Player = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [apiData, setApiData] = useState({
        name: '',
        key:'',
        published_at: '',
        typeof: ''
    })
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzVmOGZhY2VjNDhmZGU1MTFhMzk0OTZhNDhkM2ZhOSIsIm5iZiI6MTcyNjc1Njc2OC4zMDM5MjksInN1YiI6IjY2ZWMzNjRlNTE2OGE4OTZlMTIwMjJmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vGQADh8FF9v6S03ZJBqkfC-okl6ubSn2fznYkNp8Vbc",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,options)
        .then((response) => response.json())
        .then((response) => setApiData(response.results[0]))
        .catch((err) => console.error(err));
  },[])
  return (
    <div className="player">
      <Link to="/"><img src={backArrowIcon} alt="" /></Link>
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
