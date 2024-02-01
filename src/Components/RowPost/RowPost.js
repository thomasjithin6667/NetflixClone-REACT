import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import {  imageUrl,API_KEY } from '../../constants/constants'
import Youtube from 'react-youtube'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId,setUrlId]=useState('')
  useEffect(()=>{
    axios.get(props.url).then(respose=>{
     
      setMovies(respose.data.results)

    }).catch(
      err=>{
        alert('Network error')
      }
    )

  },[])
  const opts = {
    height: '700',
    width: '100%',
    playerVars: {
    
      autoplay: 1,
    }
  }
  const handleMovie=(id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-Us`).then(response=>{
      console.log(response.data);
      if(response.data.results.length!==0){
        setUrlId(response.data.results[0])
      }else{
        alert('No content available')
      }
    })
  }
  
  
  return (
    <div className='row'>
    <h2>{props.title}</h2>
    <div class='posters'>
      {movies.map((obj)=> 
                <img onClick={()=>handleMovie(obj.id)} className={props.isSmall?'smallPoster':'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`}  />


      )}
    </div>
    {urlId && <Youtube videoId={urlId.key} opts={opts}  /> }
    
</div>
  )
}

export default RowPost