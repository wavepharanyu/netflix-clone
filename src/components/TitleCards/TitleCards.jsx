import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from './../../assets/cards/Cards_data';
import { Link } from "react-router-dom";

const TitleCards = ({title, category}) => {

  const cardsRef = useRef();
  const [apiData, setApiData] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzVmOGZhY2VjNDhmZGU1MTFhMzk0OTZhNDhkM2ZhOSIsIm5iZiI6MTcyNjc1Njc2OC4zMDM5MjksInN1YiI6IjY2ZWMzNjRlNTE2OGE4OTZlMTIwMjJmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vGQADh8FF9v6S03ZJBqkfC-okl6ubSn2fznYkNp8Vbc'
    }
  };
  
  const handleWheel = (event) => {
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleWheel)
  })

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
  },[])

  return (
    <div className="title-cards">
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return(
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
              <p>{card.original_title}</p>
            </Link>
          ) 
        })}
      </div>
    </div>
  )
}

export default TitleCards